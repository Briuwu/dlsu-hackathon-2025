from fastapi import APIRouter, Body, status
from fastapi.responses import JSONResponse
from typing import List
from config.schemas import LGU
from config.database import get_lgus_collection
from utils.encoders import JSONEncoder
import json

router = APIRouter()

@router.get("/lgus", response_model=List[LGU])
async def get_all_lgus():
    """
    Endpoint to get all lgus from the database.
    """
    lgus_collection = get_lgus_collection()
    if lgus_collection is None:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"error": "Database connection not available"})
    lgus = list(lgus_collection.find())
    return JSONResponse(status_code=status.HTTP_200_OK, content=json.loads(JSONEncoder().encode(lgus)))

@router.post("/lgus", response_model=LGU)
async def create_lgu(lgu: LGU = Body(...)):
    """
    Endpoint to create a new LGU.
    """
    lgus_collection = get_lgus_collection()
    if lgus_collection is None:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"error": "Database connection not available"})
    
    lgu_dict = lgu.dict(by_alias=True)
    result = lgus_collection.insert_one(lgu_dict)
    lgu_dict["_id"] = result.inserted_id
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=json.loads(JSONEncoder().encode(lgu_dict)))

@router.get("/lgus/pages")
async def get_all_lgu_pages():
    """
    Endpoint to get all pages from the lgus collection.
    """
    lgus_collection = get_lgus_collection()
    if lgus_collection is None:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"error": "Database connection not available"})
    pages = []
    for lgu in lgus_collection.find():
        if 'pages' in lgu and isinstance(lgu['pages'], list):
            pages.extend(lgu['pages'])
    return pages
