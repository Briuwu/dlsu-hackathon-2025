import os
from dotenv import load_dotenv

load_dotenv()

SERVICE_NAME = os.getenv("SERVICE_NAME")
SERVICE_VERSION = os.getenv("SERVICE_VERSION")
MONGO_DB_URI = os.getenv("MONGO_DB_URI")

if not SERVICE_NAME:
    raise ValueError("SERVICE_NAME environment variable not set")

if not SERVICE_VERSION:
    raise ValueError("SERVICE_VERSION environment variable not set")

if not MONGO_DB_URI:
    raise ValueError("MONGO_DB_URI environment variable not set")
