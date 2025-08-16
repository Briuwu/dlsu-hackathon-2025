from google import genai

client = genai.Client()

def generate_sms_summary(context: str, keyword_category: str) -> str:
    """
    Generates a concise SMS summary from the given context using an LLM.
    """
    try:
        model = "gemini-2.5-flash"
        prompt = f"Summarize the following text for an urgent SMS notification about a {keyword_category} announcement. Keep it under 160 characters and focus on key information:\n\n{context}"
        response = client.models.generate_content(
            model=model,
            contents=prompt,
        )
        return response.text
    except Exception as e:
        print(f"Error generating SMS summary with LLM: {e}")
        return f"Announcement related to {keyword_category} found. Visit URL for details."