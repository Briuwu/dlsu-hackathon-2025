## `routes/lgus.py`

This module contains the endpoints for the lgus collection.

### Endpoints

- **`GET /lgus`**
  - Returns a list of all LGUs from the database.
  - Response Model: `List[LGU]`

  **Example Request:**
  ```bash
  curl -X GET http://localhost:8000/lgus
  ```

  **Example Response:**
  ```json
  [
    {
      "_id": "60d5ec49f72e6e4b28ef1b8d",
      "image": "https://example.com/image.png",
      "LGU": "Noveleta",
      "pages": [
        "https://en.wikipedia.org/wiki/Noveleta"
      ]
    }
  ]
  ```

- **`POST /lgus`**
  - Creates a new LGU.
  - Request Body: `LGU`
  - Response Model: `LGU`

  **Example Request:**
  ```bash
  curl -X POST http://localhost:8000/lgus -H "Content-Type: application/json" -d '
  {
    "image": "https://example.com/image.png",
    "LGU": "General Trias",
    "pages": [
      "https://en.wikipedia.org/wiki/General_Trias"
    ]
  }'
  ```

  **Example Response:**
  ```json
  {
    "_id": "60d5ec49f72e6e4b28ef1b8e",
    "image": "https://example.com/image.png",
    "LGU": "General Trias",
    "pages": [
      "https://en.wikipedia.org/wiki/General_Trias"
    ]
  }
  ```

- **`GET /lgus/pages`**
  - Returns a list of all pages from the lgus collection.

  **Example Request:**
  ```bash
  curl -X GET http://localhost:8000/lgus/pages
  ```

  **Example Response:**
  ```json
  [
    "https://en.wikipedia.org/wiki/Noveleta",
    "https://en.wikipedia.org/wiki/General_Trias"
  ]
  ```