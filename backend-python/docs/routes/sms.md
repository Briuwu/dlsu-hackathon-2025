## `routes/sms.py`

This module defines API endpoints related to SMS message management.

### Endpoints

- **GET `/health`**
  - **Summary:** Health check for SMS collection.
  - **Description:** Checks the accessibility of the SMS collection in the database.
  - **Responses:**
    - `200 OK`: Returns a success message and data if the collection is accessible.
    - `500 Internal Server Error`: If the database connection is not available or the health check fails.

- **POST `/sms`**
  - **Summary:** Save message into the SMS collection.
  - **Description:** Saves an SMS record to the `sms` collection. The record includes the SMS message, a list of subscribed numbers, and the creation timestamp.
  - **Request Body:**
    ```json
    {
      "sms_message": "string",
      "subscribed_numbers": ["string"]
    }
    ```
  - **Responses:**
    - `200 OK`: Returns a success message and the ID of the inserted document.
    - `400 Bad Request`: If required fields (`sms_message`, `subscribed_numbers`) are missing.
    - `500 Internal Server Error`: If the database connection is not available or saving fails.

- **GET `/messages/{mobile_number}`**
  - **Summary:** Get the latest message for a mobile number.
  - **Description:** Retrieves the most recent SMS message from the `sms` collection that was sent to the specified `mobile_number`.
  - **Path Parameters:**
    - `mobile_number`: The mobile number to search for (e.g., `+1234567890`).
  - **Responses:**
    - `200 OK`: Returns the latest message data.
    - `404 Not Found`: If no messages are found for the given mobile number.
    - `500 Internal Server Error`: If the database connection is not available or retrieval fails.