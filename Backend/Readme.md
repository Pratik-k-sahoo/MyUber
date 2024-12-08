<!-- filepath: /e:/PROJECT/FullStack/Uber/Backend/readme.md -->

# API Documentation=

### [1. User Endpoints](#user-endpoints)
- [User Registration](#user-registration)
- [User Login](#user-login)
- [User Profile](#user-profile)
- [User Logout](#user-logout)

### [2. Captain Endpoints](#captain-endpoints)
- [Captain Registration](#captain-registration)
- [Captain Login](#captain-login)
- [Captain Profile](#captain-profile)
- [Captain Logout](#captain-logout)

# User Endpoints
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

`GET /api/users/logout`

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
# [Captain Endpoints](#captain-endpoints)

## Captain Registration

### Endpoint

`POST /api/captain/register`

### Description

Registers a new captain in the system.

### Request Body

- **fullname** (object)
  - **firstName** (string, required): Captain's first name (minimum 3 characters).
  - **lastName** (string, optional): Captain's last name (minimum 3 characters).
- **email** (string, required): Captain's email address (must be a valid email format).
- **password** (string, required): Captain's password (minimum 6 characters).
- **vehicle** (object)
  - **color** (string, required): Vehicle color (minimum 3 characters).
  - **plate** (string, required): Vehicle plate number (minimum 8 characters).
  - **capacity** (integer, required): Vehicle capacity (minimum 1).
  - **vehicleType** (string, required): Type of vehicle (must be one of "car", "motorcycle", "auto").

#### Example Request Body

```json
{
	"fullname": {
		"firstName": "Jane",
		"lastName": "Smith"
	},
	"email": "jane.smith@example.com",
	"password": "password123",
	"vehicle": {
		"color": "Red",
		"plate": "ABC12345",
		"capacity": 4,
		"vehicleType": "car"
	}
}
```

### Response Body

- **captain** (object)
  - **fullname** (object)
    - **firstName** (string): Captain's first name (minimum 3 characters).
    - **lastName** (string): Captain's last name (minimum 3 characters).
  - **email** (string): Captain's email address (must be a valid email format).
  - **password** (string): Captain's password (minimum 6 characters).
  - **vehicle** (object)
    - **color** (string): Vehicle color (minimum 3 characters).
    - **plate** (string): Vehicle plate number (minimum 8 characters).
    - **capacity** (integer): Vehicle capacity (minimum 1).
    - **vehicleType** (string): Type of vehicle (must be one of "car", "motorcycle", "auto").

- **token** (string): JWT Token

#### Example Response Body

```json
{
	"token": "eyJhbGciOiJIMzg1MmUxNDM4ZWJjMDVkOUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzMzg1MmUxNDM4ZWJjMDVkOWEzNmEiLCJpYXQiOjE3MzM1MDcxNTR9.O_5eiT0UPmogPa9Yximmq6gP5GHf2x_FQA8E4GgPa9YxCdQAo",
	"captain": {
		"fullname": {
			"firstName": "Jane",
			"lastName": "Smith"
		},
		"email": "jane.smith@example.com",
		"password": "$2b$10$PYjtBcnKsp498eCjoquMq.FVda4pR/bBma0GyyzIpb.Jxpv1FM7xG",
		"vehicle": {
			"color": "Red",
			"plate": "ABC12345",
			"capacity": 4,
			"vehicleType": "car"
		},
		"_id": "67533852e1438ebhdgye72kc",
		"__v": 0
	}
}
```

## Captain Login

### Endpoint

`POST /api/captain/login`

### Description

Authenticates a captain using their email and password, returning a JWT token upon successful login.

### Request Body

- **email** (string, required): Captain's email address (must be a valid email format).
- **password** (string, required): Captain's password (minimum 6 characters).

#### Example Request Body

```json
{
	"email": "jane.smith@example.com",
	"password": "password123"
}
```

### Response Body

- **captain** (object)
  - **fullname** (object)
    - **firstName** (string): Captain's first name (minimum 3 characters).
    - **lastName** (string): Captain's last name (minimum 3 characters).
  - **email** (string): Captain's email address (must be a valid email format).
  - **password** (string): Captain's password (minimum 6 characters).
  - **vehicle** (object)
    - **color** (string): Vehicle color (minimum 3 characters).
    - **plate** (string): Vehicle plate number (minimum 8 characters).
    - **capacity** (integer): Vehicle capacity (minimum 1).
    - **vehicleType** (string): Type of vehicle (must be one of "car", "motorcycle", "auto").

- **token** (string): JWT Token

#### Example Response Body

```json
{
	"token": "eyJhbGciOiJIMzg1MmUxNDM4ZWJjMDVkOUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzMzg1MmUxNDM4ZWJjMDVkOWEzNmEiLCJpYXQiOjE3MzM1MDcxNTR9.O_5eiT0UPmogPa9Yximmq6gP5GHf2x_FQA8E4GgPa9YxCdQAo",
	"captain": {
		"fullname": {
			"firstName": "Jane",
			"lastName": "Smith"
		},
		"email": "jane.smith@example.com",
		"password": "$2b$10$PYjtBcnKsp498eCjoquMq.FVda4pR/bBma0GyyzIpb.Jxpv1FM7xG",
		"vehicle": {
			"color": "Red",
			"plate": "ABC12345",
			"capacity": 4,
			"vehicleType": "car"
		},
		"_id": "67533852e1438ebhdgye72kc",
		"__v": 0
	}
}
```

## Captain Profile

### Endpoint

`GET /api/captain/profile`

### Description

Retrieves the profile information of the authenticated captain. This endpoint requires a valid JWT token for authentication.

### Headers

- **Authorization**: `Bearer <token>` (string, required): The JWT token obtained upon login or registration.

### Response Body

- **captain** (object)
  - **fullname** (object)
    - **firstName** (string): Captain's first name.
    - **lastName** (string): Captain's last name.
  - **email** (string): Captain's email address.
  - **vehicle** (object)
    - **color** (string): Vehicle color.
    - **plate** (string): Vehicle plate number.
    - **capacity** (integer): Vehicle capacity.
    - **vehicleType** (string): Type of vehicle.

#### Example Response Body

```json
{
	"captain": {
		"fullname": {
			"firstName": "Jane",
			"lastName": "Smith"
		},
		"email": "jane.smith@example.com",
		"vehicle": {
			"color": "Red",
			"plate": "ABC12345",
			"capacity": 4,
			"vehicleType": "car"
		}
	}
}
```

## Captain Logout

### Endpoint

`GET /api/captain/logout`

### Description

Logs out the authenticated captain by invalidating their JWT token. This endpoint requires a valid JWT token for authentication.

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

## User Authentication Middleware

The authentication middleware ensures that only authenticated users can access certain endpoints. It verifies the presence and validity of the JWT token in the request headers.

## Captain Authentication Middleware

The captain authentication middleware ensures that only authenticated captains can access certain endpoints. It verifies the presence and validity of the JWT token in the request headers.

## JWT Token Blacklisting

JWT token blacklisting is used to invalidate tokens upon user logout. This ensures that a logged-out user cannot use the same token to access protected endpoints.
