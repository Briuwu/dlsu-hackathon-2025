import asyncio
import contextlib
from fastapi import FastAPI
from contextlib import asynccontextmanager
from crawl4ai import AsyncWebCrawler
from utils.url_manager import get_urls_to_scrape, add_url_to_removed_list, handle_daily_reset
from utils.twilio_manager import send_sms_notification
from utils.state import crawler_state
from utils.constants import HIT_STRINGS
from config.database import get_lgus_collection
# from pprint import pprint

# --- Web Crawler Logic ---
async def crawl_and_process():
    handle_daily_reset()
    
    lgus_collection = get_lgus_collection()
    if lgus_collection is None:
        print("No LGU collection found.")
        return {"status": "idle", "message": "No URLs to scrape.", "found_urls": []}
    all_lgu_pages = []
    for lgu in lgus_collection.find():
        all_lgu_pages.extend(lgu.get("pages", []))

    if not all_lgu_pages:
        print("No URLs to scrape.")
        return {"status": "idle", "message": "No URLs to scrape.", "found_urls": []}

    scraped_data = {}
    async with AsyncWebCrawler() as crawler:
        tasks = [crawler.arun(url=url) for url in all_lgu_pages]
        results = await asyncio.gather(*tasks)
        scraped_data = {url: result.markdown for url, result in zip(all_lgu_pages, results)}

    all_found_urls_with_context = []
    for category, target_strings in HIT_STRINGS.items():
        urls_to_check_for_category = get_urls_to_scrape(category)
        
        # Filter scraped_data to only include URLs relevant to this category that haven't been removed
        filtered_scraped_data = {url: content for url, content in scraped_data.items() if url in urls_to_check_for_category}
        
        found_for_category = find_urls_with_string(filtered_scraped_data, target_strings, category)
        all_found_urls_with_context.extend(found_for_category)

    if all_found_urls_with_context:
        print(f"\nFound {len(all_found_urls_with_context)} URL(s) with target strings across categories.")
        for url, category, context in all_found_urls_with_context:
            add_url_to_removed_list(url, category)
            send_sms_notification(url, category, context) # Pass category and context
    
    return {"status": "success", "found_urls": [item[0] for item in all_found_urls_with_context]} # Return just URLs for consistency

def find_urls_with_string(results_dict, target_strings, keyword_category):
    found_urls_with_context = []
    for url, content in results_dict.items():
        for target_string in target_strings:
            if content and target_string and target_string in content:
                print(f"Found '{target_string}' (Category: {keyword_category}) at URL: {url}")
                
                target_start_index = content.find(target_string)
                
                before_text = content[:target_start_index]
                before_words = before_text.split()
                start_words = before_words[-50:]
                
                after_text_start_index = target_start_index + len(target_string)
                after_text = content[after_text_start_index:]
                after_words = after_text.split()
                end_words = after_words[:50]
                
                context_words = start_words + target_string.split() + end_words
                context = " ".join(context_words)
                
                print("--- Start of Context ---")
                print(context)
                print("--- End of Context ---")
                
                found_urls_with_context.append((url, keyword_category, context))
                break # Break after finding the first target string in this content for this URL
    return found_urls_with_context


async def crawler_background_loop():
    crawler_state["status"] = "running"
    while True:
        print("--- Starting new crawler run ---")
        results = await crawl_and_process()
        
        crawler_state["last_run_results"] = results
        crawler_state["urls_found"] = len(results.get("found_urls", []))
        
        print("--- Crawler run finished. Waiting 120 seconds. ---")
        await asyncio.sleep(10)

# --- Lifespan Context ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Application startup: Starting crawler background task.")
    task = asyncio.create_task(crawler_background_loop())
    try:
        yield
    finally:
        print("Application shutdown: Cancelling crawler background task.")
        task.cancel()
        with contextlib.suppress(asyncio.CancelledError):
            await task
