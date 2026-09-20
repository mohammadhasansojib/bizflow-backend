# API Documentation

## API Routes

### Auth

- **`POST /api/v1/auth/register`**

    request body:
    ```json
    {
        "username": "Sajib",
        "email": "sajib@mail.com",
        "password": "12345678"
    }
    ```

    response:
    ```json
    {
        "success": true,
        "message": "User registered successfully",
        "statusCode": 201,
        "data": {
            "user": {
                "id": "1efe35e7-1df9-4b61-8e3d-e8e222517c76",
                "username": "Sajib",
                "email": "sajib@mail.com",
                "createdAt": "2026-09-20T18:09:56.615Z",
                "updatedAt": "2026-09-20T18:09:56.615Z"
            }
        }
    }
    ```