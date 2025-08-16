# PulsePH: Web Crawler Service for SDG 11

This service, part of the PulsePH application, is designed to support SDG 11 (Sustainable Cities and Communities) by scraping local LGU (Local Government Unit) pages to detect urgent announcements such as class suspensions. It aims to provide timely notifications via SMS, eliminating the need for users to constantly monitor social media for updates.

## Features

- **Automated Web Crawling**: Periodically scrapes specified web pages.
- **Keyword Detection**: Identifies predefined keywords or phrases on scraped pages.
- **Contextual SMS Notifications**: Sends alerts to subscribed users via Twilio with LLM-generated summaries of the relevant content.
- **Granular URL Management**: Prevents duplicate notifications for the same announcement type on a given URL within a day, while allowing detection of different announcements.
- **MongoDB Integration**: Stores LGU, user, and SMS notification data.
- **RESTful API**: Provides endpoints for managing users, LGUs, SMS records, and checking service health.

## Setup

### Prerequisites

- Python 3.9+
- MongoDB instance (local or remote)
- Twilio Account (for SMS notifications)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/crawl4ai-installation.git
    cd crawl4ai-installation
    ```

2.  **Create a virtual environment and activate it:**
    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Create a `.env` file in the root directory** and add your environment variables:
    ```
    MONGO_DB_URI="mongodb://localhost:27017/"
    TWILIO_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    TWILIO_AUTH_KEY="your_twilio_auth_token"
    TWILIO_NUMBER="+1234567890"
    GEMINI_API_KEY="your_gemini_api_key"
    ```
    - `MONGO_DB_URI`: Your MongoDB connection string. Ensure the database name `hackercup2025` is part of the URI or configured in `config/database.py`.
    - `TWILIO_SID`: Your Twilio Account SID.
    - `TWILIO_AUTH_KEY`: Your Twilio Auth Token.
    - `TWILIO_NUMBER`: Your Twilio phone number (e.g., `+15017122661`).

## Running the Application (Backend)

Follow these steps to set up and run the PulsePH backend service:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/crawl4ai-installation.git
    cd crawl4ai-installation
    ```

2.  **Create a virtual environment and activate it:**
    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    ```

3.  **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Install `crawl4ai` dependencies:**
    ```bash
    crawl4ai-setup
    ```
    This command will install necessary browser dependencies for the web crawler.

5.  **Create a `.env` file in the root directory** and add your environment variables:
    ```
    MONGO_DB_URI="mongodb://localhost:27017/"
    TWILIO_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    TWILIO_AUTH_KEY="your_twilio_auth_token"
    TWILIO_NUMBER="+1234567890"
    GEMINI_API_KEY="your_gemini_api_key"
    ```
    - `MONGO_DB_URI`: Your MongoDB connection string. Ensure the database name `hackercup2025` is part of the URI or configured in `config/database.py`.
    - `TWILIO_SID`: Your Twilio Account SID.
    - `TWILIO_AUTH_KEY`: Your Twilio Auth Token.
    - `TWILIO_NUMBER`: Your Twilio phone number (e.g., `+15017122661`).
    - `GEMINI_API_KEY`: Your Google Gemini API Key for LLM-generated SMS summaries.

6.  **Start the FastAPI application:**
    ```bash
    uvicorn main:app --reload
    ```

Once the application is running, the API documentation will be available at `http://localhost:8000/docs`.

## API Endpoints

For detailed information on API endpoints, request bodies, and response models, please refer to the [API Documentation](docs/main.py.md).

## Project Structure

```
. 
├── config/
│   ├── database.py         # MongoDB connection and collection access
│   ├── environments.py     # Environment variable loading
│   ├── routes.py           # Status endpoint for crawler state
│   └── schemas.py          # Pydantic schemas for data models
├── docs/
│   ├── config/
│   │   ├── database.md
│   │   └── schemas.md
│   ├── llm/
│   │   └── gpt_client.md
│   ├── routes/
│   │   ├── health.md
│   │   ├── lgus.md
│   │   ├── sms.md
│   │   └── users.md
│   ├── utils/
│   │   ├── constants.md
│   │   ├── crawler.md
│   │   ├── encoders.md
│   │   ├── twilio_manager.md
│   │   └── url_manager.md
│   └── main.py.md
├── llm/
│   └── gpt_client.py       # LLM client for SMS summary generation
├── routes/
│   ├── __init__.py         # Initializes routes package
│   ├── health.py           # Database health check endpoint
│   ├── lgus.py             # LGU related endpoints (get, create)
│   ├── sms.py              # SMS related endpoints (health, save, get latest)
│   └── users.py            # User related endpoints (get, create)
├── utils/
│   ├── constants.py        # Constant values like HIT_STRINGS and REMOVED_URLS_DIR
│   ├── crawler.py          # Web crawler logic and lifespan management
│   ├── encoders.py         # Custom JSON encoder for ObjectId
│   ├── state.py            # Crawler state management
│   ├── twilio_manager.py   # Twilio SMS notification logic
│   └── url_manager.py      # URL management for scraping
├── .env                    # Environment variables (create this file)
├── .gitignore
├── main.py                 # Main FastAPI application entry point
├── README.md
├── requirements.txt
├── removed_urls/           # Directory for keyword-specific removed URLs (managed by service)
└── last_run_date.txt       # Stores the last date the crawler ran (managed by service)
```
