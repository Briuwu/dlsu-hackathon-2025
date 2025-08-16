## `config/schemas.py`

This module contains the Pydantic schemas for the User, LGU, and SMS collections.

### Classes

- **`PyObjectId`**
  - A custom Pydantic field type for MongoDB's `ObjectId`.

- **`User`**
  - `id`: PyObjectId (alias for `_id`)
  - `number`: str
  - `subscribed_lgus`: List[str]

- **`LGU`**
  - `id`: PyObjectId (alias for `_id`)
  - `image`: str
  - `LGU`: str
  - `pages`: List[str]

- **`SMS`**
  - `id`: PyObjectId (alias for `_id`)
  - `sms_message`: str
  - `subscribed_numbers`: List[str]
  - `created_at`: datetime