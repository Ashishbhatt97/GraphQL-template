# GraphQL API with Prisma and Authentication

This is a GraphQL API built with Node.js, Prisma, and JWT-based authentication. It supports user management, role-based access control, and token-based authentication.

## Features

- User registration and login
- JWT-based authentication
- Role-based access control (Admin, User)
- Update user profile
- Prisma for database management

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Pg Admin](https://www.pgadmin.org/download/pgadmin-4-windows) (or any other database supported by Prisma)
- [Git](https://git-scm.com/)


## 🛠 Installation  

### 1️⃣ **Clone the Repository**  
```bash
git clone https://github.com/Ashishbhatt97/GraphQL-template.git
cd GraphQL-template
```

### 2️⃣ Install Dependencies

#### **Frontend**
```bash
cd frontend
npm install --force
```

#### **Backend**
```bash
cd backend
npm install
```

### Set Up Environment Variables
```bash
cd backend
```
``` bash
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_ACCESS_SECRET="your_jwt_access_secret"
JWT_REFRESH_SECRET="your_jwt_refresh_secret"
```

### 3️⃣ Start the Project
#### **Run Frontend**
```bash
npm run dev
```
#### **Run Backend**
```bash
npm run dev
````
