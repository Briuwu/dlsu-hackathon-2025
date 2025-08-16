## `config/database.py`

This module handles the connection to the MongoDB database.

### Functions

- **`get_db()`**
  - Returns the database instance.

- **`get_users_collection()`**
  - Returns the users collection from the database.

- **`get_lgus_collection()`**
  - Returns the lgus collection from the database.

- **`get_sms_collection()`**
  - Returns the sms collection from the database.

- **`check_db_connection()`**
  - Checks the status of the MongoDB connection.

### Usage

To use the database functions, import them into your script:

```python
from config.database import get_db, get_users_collection, get_lgus_collection, check_db_connection

# Get the database instance
db = get_db()

# Get the users collection
users_collection = get_users_collection()

# Get the LGUs collection
lgus_collection = get_lgus_collection()

# Check the database connection status
status = check_db_connection()
print(status)
```
