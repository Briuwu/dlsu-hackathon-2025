## `main.py`

This is the main file for the FastAPI application.

This file is responsible for setting up the FastAPI application, including the lifespan context manager for the web crawler and including the routers from the `routes` directory.

It includes the following routers:
- `status_router` (from `config.routes`)
- `health.router`
- `users.router`
- `lgus.router`
- `sms.router`

For more information about the available endpoints, please see the documentation for the respective router modules.