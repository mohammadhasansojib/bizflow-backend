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

- **`POST /api/v1/auth/login`**

    request body:
    ```json
    {
        "email": "sajib@mail.com",
        "password": "12345678"
    }
    ```

    response:
    ```json
    {
        "success": true,
        "message": "login successful",
        "statusCode": 200,
        "data": {
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFlZmUzNWU3LTFkZjktNGI2MS04ZTNkLWU4ZTIyMjUxN2M3NiIsImVtYWlsIjoic2FqaWJAbWFpbC5jb20iLCJpYXQiOjE3ODk5Mjk1ODksImV4cCI6MTc5MDAxNTk4OX0.sef4czRt-4kN38qFu_v2Odv51BaOcMI1fiSzn7kVGFo",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFlZmUzNWU3LTFkZjktNGI2MS04ZTNkLWU4ZTIyMjUxN2M3NiIsImVtYWlsIjoic2FqaWJAbWFpbC5jb20iLCJpYXQiOjE3ODk5Mjk1ODksImV4cCI6MTc5MDUzNDM4OX0.BkDPqX2p16GK8kCRUM6T7OlXQLeM0wE2t8zZ8vtwmtM"
        }
    }
    ```


- **`POST /api/v1/auth/me`**
    - auth: true

    request body:
    ```json
    
    ```

    response:
    ```json
    {
        "success": true,
        "message": "user info retrived successfully",
        "statusCode": 200,
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