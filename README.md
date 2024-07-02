# Bi-test
1 > npm i
2 > update env send mail credentials (ethereal for test)
3 > npm run dev
4 >  http://localhost:PORT/index.html
5 > fill the form and click on submit

done==>
mongo db connection
register user
request validation
file upload



# User Registration API

This API allows users to register by providing their name, email address, password, and profile picture. Upon successful registration, the user's information is stored in a MongoDB database, and a confirmation email is sent to the registered email address.

## Requirements

- Node.js
- MongoDB

## Setup

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file with the following environment variables:
    ```dotenv
    MONGO_URI=your_mongodb_connection_string
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password
    ```
4. Start the server:
    ```bash
    npm start
    ```

## Endpoints

### POST /register

Registers a new user.

#### Request

- Headers:
  - `Content-Type: multipart/form-data`
- Body:
  - `name`: string (required)
  - `email`: string (required)
  - `password`: string (required)
  - `profilePicture`: file (optional)

#### Response

- Success: `201 Created`
  ```json
  {
    "message": "User registered successfully. Please check your email for confirmation."
  }
