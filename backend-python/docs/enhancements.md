## Enhancements

### Dynamic SMS Notification Messages

**Status:** Implemented

**Description:** The system now sends dynamic SMS messages based on the detected keyword category. A mock LLM integration is in place to generate concise summaries from scraped content.

### Contextual SMS from Scraped Content

**Status:** Implemented

**Description:** When a target keyword is found, the crawler extracts surrounding text (200 words before and after the hit string). This context is then used by an LLM (mocked for now) to generate a concise and informative SMS message, which is then sent to subscribed users.

### Granular URL Management

**Status:** Implemented

**Description:** Instead of a single `removed_urls.txt`, the system now uses keyword-specific cache files (e.g., `removed_urls_class_suspension.txt`). The crawler only skips a URL for a specific keyword if that keyword has already been found and logged for that URL on the same day. This allows for multiple, different announcements from the same LGU page to be detected and notified.