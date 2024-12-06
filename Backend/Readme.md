<!-- filepath: /e:/PROJECT/FullStack/Uber/Backend/readme.md -->

# API Documentation

## User Registration

### Endpoint

`POST /api/users/register`

### Description

Registers a new user in the system.

### Request Body

- **fullname** (object)
  - **firstName** (string, required): User's first name (minimum 3 characters).
  - **lastName** (string, optional): User's last name (minimum 3 characters).
- **email** (string, required): User's email address (must be a valid email format).
- **password** (string, required): User's password (minimum 6 characters).

#### Example Request Body

```json
{
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response Body

- **user** (object)
  - **fullname** (object).
    - **firstName** (string): User's first name (minimum 3 characters).
    - **lastName** (string): User's last name (minimum 3 characters).
  - **email** (string): User's email address (must be a valid email format).
  - **password** (string): User's password (minimum 6 characters).

- **token** (string): JWT Token

#### Example Request Body

```json
{
    "token": "eyJhbGciOiJIMzg1MmUxNDM4ZWJjMDVkOUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzMzg1MmUxNDM4ZWJjMDVkOWEzNmEiLCJpYXQiOjE3MzM1MDcxNTR9.O_5eiT0UPmogPa9Yximmq6gP5GHf2x_FQA8E4GgPa9YxCdQAo",
    "user": {
        "fullname": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "password": "$2b$10$PYjtBcnKsp498eCjoquMq.FVda4pR/bBma0GyyzIpb.Jxpv1FM7xG",
        "_id": "67533852e1438ebhdgye72kc",
        "__v": 0
    }
}
```
