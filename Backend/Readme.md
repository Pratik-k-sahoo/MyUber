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

#### Example Response Body

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

## User Login

### Endpoint

`POST /api/users/login`

### Description

Authenticates a user with their email and password, returning a JWT token upon successful login.

### Request Body

- **email** (string, required): User's email address (must be a valid email format).
- **password** (string, required): User's password (minimum 6 characters).

#### Example Request Body

```json
{
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

#### Example Response Body

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

## User Profile

### Endpoint

`GET /api/user/profile`

### Description

Retrieves the profile information of the authenticated user. This endpoint requires a valid JWT token for authentication.

### Headers

- **Authorization**: `Bearer <token>` (string, required): The JWT token obtained upon login or registration.

### Response Body

- **user** (object)
  - **fullname** (object)
    - **firstName** (string): User's first name.
    - **lastName** (string): User's last name.
  - **email** (string): User's email address.

#### Example Response Body

```json
{
	"user": {
		"fullname": {
			"firstName": "John",
			"lastName": "Doe"
		},
		"email": "john.doe@example.com"
	}
}
```

## User Logout

### Endpoint

`POST /api/users/logout`

### Description

Logs out the authenticated user by invalidating their JWT token. This endpoint requires a valid JWT token for authentication.

### Headers

- **Authorization**: `Bearer <token>` (string, required): The JWT token obtained upon login or registration.

### Response Body

- **message** (string): Confirmation message indicating successful logout.

#### Example Response Body

```json
{
	"message": "Successfully logged out"
}
```

## Authentication Middleware

The authentication middleware ensures that only authenticated users can access certain endpoints. It verifies the presence and validity of the JWT token in the request headers.

## JWT Token Blacklisting

JWT token blacklisting is used to invalidate tokens upon user logout. This ensures that a logged-out user cannot use the same token to access protected endpoints.
