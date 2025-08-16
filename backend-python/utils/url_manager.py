"""
Manages the list of URLs to be scraped.

This module handles the daily reset of scraped URLs and ensures that URLs
where the target string has been found are not scraped again on the same day.
"""
from datetime import date
from config.database import get_lgus_collection
import os
from utils.constants import HIT_STRINGS, REMOVED_URLS_DIR

# Ensure the removed_urls directory exists
os.makedirs(REMOVED_URLS_DIR, exist_ok=True)

LAST_RUN_DATE_FILE = "last_run_date.txt"

def get_removed_urls_file_path(keyword_category):
    return os.path.join(REMOVED_URLS_DIR, f"removed_urls_{keyword_category}.txt")

def get_urls_to_scrape(keyword_category):
    """
    Gets the list of URLs to scrape for a specific keyword category, excluding any that have been removed.

    Args:
        keyword_category: The category of keywords (e.g., 'class_suspension').

    Returns:
        A list of URLs to be scraped.
    """
    lgus_collection = get_lgus_collection()
    if lgus_collection is None:
        return []
    all_lgu_pages = []
    for lgu in lgus_collection.find():
        all_lgu_pages.extend(lgu.get("pages", []))

    removed_urls_file = get_removed_urls_file_path(keyword_category)
    try:
        with open(removed_urls_file, "r") as f:
            removed_urls = [line.strip() for line in f.readlines()]
    except FileNotFoundError:
        removed_urls = []
    
    return [url for url in all_lgu_pages if url not in removed_urls]

def add_url_to_removed_list(url, keyword_category):
    """
    Adds a URL to the list of removed URLs for a specific keyword category.

    Args:
        url: The URL to add to the removed list.
        keyword_category: The category of keywords (e.g., 'class_suspension').
    """
    removed_urls_file = get_removed_urls_file_path(keyword_category)
    with open(removed_urls_file, "a") as f:
        f.write(url + "\n")

def handle_daily_reset():
    """
    Checks if it's a new day and clears the removed URLs lists for all keyword categories if so.

    This function maintains a file with the last run date. If the current
    date is different, it clears the list of removed URLs for each category,
    allowing them to be scraped again.
    """
    today = date.today().isoformat()
    try:
        with open(LAST_RUN_DATE_FILE, "r") as f:
            last_run_date = f.read().strip()
    except FileNotFoundError:
        last_run_date = ""

    if today != last_run_date:
        # It's a new day, so clear the removed URLs files for all categories
        for category in HIT_STRINGS.keys():
            removed_urls_file = get_removed_urls_file_path(category)
            open(removed_urls_file, "w").close()
        # Update the last run date
        with open(LAST_RUN_DATE_FILE, "w") as f:
            f.write(today)
