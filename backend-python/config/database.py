from pymongo import MongoClient, errors
from .environments import MONGO_DB_URI
import certifi

try:
    client = MongoClient(MONGO_DB_URI, tlsCAFile=certifi.where())

    db = client.hackercup2025

    print("Successfully connected to MongoDB.")
except errors.ConnectionFailure as e:
    print(f"Could not connect to MongoDB: {e}")
except Exception as e:
    print(f"An error occurred: {e}")

def get_db():
    """
    Returns the database instance.
    """
    return db

def get_users_collection():
    """
    Returns the users collection from the database.
    """
    if db is not None:
        return db.users
    return None

def get_lgus_collection():
    """
    Returns the lgus collection from the database.
    """
    if db is not None:
        return db.lgus
    return None

def get_sms_collection():
    """
    Returns the sms collection from the database.
    """
    if db is not None:
        return db.sms
    return None

def check_db_connection():
    """
    Checks the status of the MongoDB connection.
    """
    if client is None:
        return {"status": "disconnected", "message": "MongoDB client is not initialized."}
    try:
        # The ismaster command is cheap and does not require auth.
        client.admin.command('ismaster')
        return {"status": "connected", "message": f"MongoDB connection is healthy."}
    except errors.ConnectionFailure as e:
        return {"status": "disconnected", "message": f"MongoDB connection failed: {e}"}
