# **Backend for Guess App**

This is the backend for the **Guess App**, built using **Fastify**, **TypeScript**, and **JWT authentication**.

## **Installation and Setup**

### **1. Clone the Repository**
```sh
git clone https://github.com/samitochi04/Guess/tree/main/backend.git
cd backend
```

2. Install Dependencies
```sh
Copy
Edit
npm install
```


3. Create a .env File
In the root of the backend directory, create a .env file and add:
```sh
env
Copy
Edit
JWT_SECRET=your_secret_key
```

4. Run the Development Server
```sh
Copy
Edit
npm run dev
```

5. Build and Start for Production
```sh
Copy
Edit
npm run build
npm start
```

## Dependencies
The following dependencies are used in this project:

```sh
Package	Description
fastify	Fast and lightweight web framework
fastify-jwt	JWT authentication for Fastify
bcrypt	Password hashing library
fastify-formbody	Middleware to parse form data
Dev Dependencies
Package	Description
ts-node	Run TypeScript directly
nodemon	Auto-restart server on file changes
@types/node	Type definitions for Node.js
@types/bcrypt	Type definitions for bcrypt
@types/jsonwebtoken	Type definitions for JWT
```

## Project Structure
```sh
Copy
Edit
backend/
├── src/
│   ├── api/
│   │   ├── auth/          # Authentication routes
│   ├── services/
│   │   ├── auth.ts        # Authentication logic
│   ├── app.ts             # Fastify app setup
│   ├── server.ts          # Server entry point
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── README.md              # This file
```

## API Endpoints

1. Sign Up
POST /api/auth/signup

json
Copy
Edit
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

2. Login
POST /api/auth/login

json
Copy
Edit
{
  "email": "john@example.com",
  "password": "securepassword"
}
Response:

json
Copy
Edit
{
  "token": "your.jwt.token"
}
### License
This project is licensed under the `MIT` License.

