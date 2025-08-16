from fastapi import FastAPI
from utils.crawler import lifespan
from routes import health, users, lgus, sms
from config.routes import router as status_router

# --- FastAPI App Setup ---
app = FastAPI(
    title="Web Crawler Service",
    description="A service that continuously crawls web pages and sends notifications.",
    version="1.0.0",
    lifespan=lifespan
)

app.include_router(status_router)
app.include_router(health.router)
app.include_router(users.router)
app.include_router(lgus.router)
app.include_router(sms.router)
