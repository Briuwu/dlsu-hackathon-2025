## `utils/url_manager.py`

This module manages the list of URLs to be scraped, implementing granular URL management based on keyword categories.

### Functions

- **`get_removed_urls_file_path(keyword_category)`**
  - Constructs the absolute file path for the keyword-specific removed URLs file (e.g., `removed_urls/removed_urls_class_suspension.txt`).

- **`get_urls_to_scrape(keyword_category)`**
  - Gets the list of URLs to scrape for a specific `keyword_category` from the database, excluding any that have already been marked as 'removed' for that particular category on the current day.

- **`add_url_to_removed_list(url, keyword_category)`**
  - Adds a `url` to the keyword-specific removed URLs file for the given `keyword_category`. This prevents the same URL from triggering multiple notifications for the *same* type of announcement within a day.

- **`handle_daily_reset()`**
  - Checks if it's a new day. If so, it clears all keyword-specific removed URLs files, allowing all URLs to be scraped again for all categories.