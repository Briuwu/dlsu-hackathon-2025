from fastapi import APIRouter, HTTPException
from config.database import get_sms_collection
from datetime import datetime

router = APIRouter()

@router.get("/health", summary="Health check for SMS collection")
async def health_check():
    sms_collection = get_sms_collection()
    if sms_collection is None:
        raise HTTPException(status_code=500, detail="Database connection not available.")
    
    try:
        # Attempt to count documents to check connection
        sms_collection.count_documents({})
        return {"message": "Health check is success", "data": "SMS collection is accessible"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"SMS collection health check failed: {e}")

@router.post("/sms", summary="Save message into the SMS collection")
async def save_sms_message(sms_data: dict):
    sms_collection = get_sms_collection()
    if sms_collection is None:
        raise HTTPException(status_code=500, detail="Database connection not available.")
    
    # Validate incoming data against schema (basic validation for now)
    if "sms_message" not in sms_data or "subscribed_numbers" not in sms_data:
        raise HTTPException(status_code=400, detail="Missing required fields: sms_message or subscribed_numbers")
    
    sms_record = {
        "sms_message": sms_data["sms_message"],
        "subscribed_numbers": sms_data["subscribed_numbers"],
        "created_at": datetime.now()
    }
    
    try:
        result = sms_collection.insert_one(sms_record)
        return {"message": "SMS record saved successfully", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save SMS record: {e}")

@router.get("/messages/{mobile_number}", summary="Get the latest message for a mobile number")
async def get_latest_sms_for_number(mobile_number: str):
    sms_collection = get_sms_collection()
    if sms_collection is None:
        raise HTTPException(status_code=500, detail="Database connection not available.")
    
    try:
        # Find the latest message where the mobile_number is in the subscribed_numbers array
        message = sms_collection.find_one(
            {"subscribed_numbers": mobile_number},
            sort=[("created_at", -1)] # Sort by created_at in descending order to get the latest
        )
        
        if message:
            # Convert ObjectId to string for JSON serialization
            message["_id"] = str(message["_id"])
            # Remove subscribed_numbers for security purposes
            if "subscribed_numbers" in message:
                del message["subscribed_numbers"]
            return {"message": "Latest message retrieved successfully", "data": message}
        else:
            raise HTTPException(status_code=404, detail="No messages found for this mobile number.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve message: {e}")