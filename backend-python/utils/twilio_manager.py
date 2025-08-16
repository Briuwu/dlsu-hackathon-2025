import os
from twilio.rest import Client
from dotenv import load_dotenv
from config.database import get_users_collection, get_lgus_collection, get_sms_collection
from datetime import datetime
from llm.gpt_client import generate_sms_summary

load_dotenv()

TWILIO_SID = os.getenv("TWILIO_SID")
TWILIO_AUTH_KEY = os.getenv("TWILIO_AUTH_KEY")
TWILIO_NUMBER = os.getenv("TWILIO_NUMBER")

def send_sms_notification(url, keyword_category, context):
    """
    Sends an SMS notification to subscribed users when a target string is found
    and saves the SMS details to the database.
    """
    if not all([TWILIO_SID, TWILIO_AUTH_KEY, TWILIO_NUMBER]):
        print("Twilio credentials are not fully configured. SMS not sent.")
        return

    client = Client(TWILIO_SID, TWILIO_AUTH_KEY)
    lgus_collection = get_lgus_collection()
    users_collection = get_users_collection()
    sms_collection = get_sms_collection()

    if lgus_collection is None or users_collection is None or sms_collection is None:
        print("Database connection not available. SMS not sent or saved.")
        return

    # Find which LGU this URL belongs to
    lgu = lgus_collection.find_one({"pages": url})

    if not lgu:
        print(f"Could not find LGU for URL: {url}")
        return
    
    lgu_name = lgu.get("LGU")

    # Find users subscribed to this LGU
    subscribed_numbers = []
    for user in users_collection.find({"subscribed_lgus": lgu_name}):
        subscribed_numbers.append(user.get("number"))

    if not subscribed_numbers:
        print(f"No users subscribed to LGU: {lgu_name}")
        return
    mock_message_generation_from_llm = generate_sms_summary(context=context, keyword_category=keyword_category)
    # Generate SMS message using LLM
    message_body = f"[PulsePH] ALERT: {mock_message_generation_from_llm} Source LGU: {lgu_name} ({url})"

    # Save SMS details to the database
    sms_record = {
        "sms_message": message_body,
        "subscribed_numbers": subscribed_numbers,
        "created_at": datetime.now()
    }
    try:
        sms_collection.insert_one(sms_record)
        print("SMS record saved to database.")
    except Exception as e:
        print(f"Failed to save SMS record to database: {e}")

    for number in subscribed_numbers:
        try:
            message = client.messages.create(
                body=message_body,
                from_=TWILIO_NUMBER,
                to=number
            )
            print(f"Message sent to {number}: {message.sid}")
        except Exception as e:
            print(f"Failed to send message to {number}: {e}")
