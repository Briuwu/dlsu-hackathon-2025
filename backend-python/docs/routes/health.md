## `routes/health.py`

This module contains the health check endpoint.

### Endpoints

- **`GET /db-health`**
  - Checks the health of the MongoDB connection.

  **Example Request:**

  ```bash
  curl -X GET http://localhost:8000/db-health
  ```

  **Example Response (Success):**

  ```json
  {
    "status": "connected",
    "message": "MongoDB connection is healthy."
  }
  ```

  **Example Response (Failure):**

  ```json
  {
    "status": "disconnected",
    "message": "MongoDB connection failed: [error message]"
  }
  ```