from fastapi import APIRouter
from config.database import check_db_connection

router = APIRouter()

@router.get("/db-health")
async def db_health():
    """
    Endpoint to check the database connection health.
    """
    return check_db_connection()
