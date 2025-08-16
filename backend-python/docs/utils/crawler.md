## `utils/crawler.py`

This module contains the web crawler logic and the FastAPI lifespan context manager.

### Functions

- **`crawl_and_process()`**
  - This asynchronous function orchestrates the web crawling process. It first handles the daily reset of URL caches, then retrieves all LGU pages from the database. It scrapes the content of these pages concurrently. For each scraped page, it iterates through predefined keyword categories (e.g., 'class_suspension') and their associated target strings. If a target string is found, it extracts the surrounding 200 words as context, adds the URL to a keyword-specific removed list, and triggers an SMS notification with the extracted context.

- **`find_urls_with_string(results_dict, target_strings, keyword_category)`**
  - This function searches for any of the `target_strings` within the content of URLs provided in `results_dict`. If a match is found, it extracts approximately 200 words of context around the hit string. It returns a list of tuples, where each tuple contains the URL, the `keyword_category`, and the extracted `context`.

- **`crawler_background_loop()`**
  - This asynchronous function runs the web crawler in a continuous loop, calling `crawl_and_process` periodically.

- **`lifespan(app: FastAPI)`**
  - This is a FastAPI lifespan context manager that starts the web crawler as a background task when the application starts and cancels it when the application shuts down.