from fastapi import APIRouter
from utils.state import crawler_state

router = APIRouter()

@router.get("/status")
async def get_status():
    """
    Endpoint to get the current status of the crawler.
    """
    return crawler_state
