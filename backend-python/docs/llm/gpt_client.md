## `llm/gpt_client.py`

This module provides functionality to interact with the Gemini LLM for generating concise SMS summaries.

### Functions

- **`generate_sms_summary(context: str, keyword_category: str) -> str`**
  - Generates a concise SMS summary from the given `context` using the Gemini LLM. The `keyword_category` helps in crafting a more relevant prompt for the LLM. It aims to keep the summary under 160 characters and focuses on key information for urgent SMS notifications.
  - If the `GEMINI_API_KEY` is not configured or an error occurs during generation, it returns a generic fallback message.