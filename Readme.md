# Docker Compose Preact.js SQL Server Todo App

## 🚀 Overview

- This is a simple Todo App that uses Preact.js for the frontend and SQL Server as the database. The application is containerized using Docker Compose, enabling easy deployment and scalability.

## 🛠 Features

Frontend: Built with Preact.js, offering a fast and lightweight user interface.
Backend: Handles business logic and API endpoints (can be implemented in your choice of backend framework).
Database: SQL Server is used to store and manage todos.
Containerization: All components are containerized using Docker for a seamless development and deployment experience.


## 📂 Project Structure

graphql
Copy code
Docker_Compose_Preactjs_SQL_Server_Todo_App/
├── backend/           # Backend code (API endpoints, database interaction)
├── frontend/          # Frontend code (Preact.js app)               
├── docker-compose.yml # Docker Compose file to orchestrate services
└── README.md          # Project documentation


## 🐳 Prerequisites
Docker
Docker Compose



## 🖥 Technologies Used

Frontend: Preact.js
Backend: Custom backend logic (Node.js, Python, or any preferred framework)
Database: Microsoft SQL Server
Containerization: Docker
🛠 Environment Variables
Define your environment variables in a .env file for easy configuration:

env
Copy code
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=todo_app
APP_PORT=5000


## 📖 How It Works

Frontend:

Preact.js app allows users to manage todos (add, delete).
Communicates with the backend API via RESTful endpoints.
Backend:

Processes requests from the frontend.
Interacts with SQL Server to store and retrieve todo data.
Database:

Stores todos in a structured format.
Managed via SQL Server with Dockerized persistence.

## 🛠 Development
Frontend Development:

bash
Copy code
cd frontend
npm install
npm run dev
Backend Development:

bash
Copy code
cd backend
npm install
npm run dev


## 🎉 Acknowledgments
Preact.js for the lightweight frontend framework.
SQL Server for database management.
Docker for simplifying deployment.








# Note
1. To create a connection with SQL, avoid setting the database name if it has not been created in SQL yet.

```javascript
const config = {
    user: 'yourUser',
    password: 'yourPassword',
    server: 'localhost',
    port: 1433,

    options: {
        encrypt: false, // Set to true if using SSL
        trustServerCertificate: true
    }
};

```

2. After creating the connection with sql server you can creaet your Database name as well


```javascript
sql.connect(config)
    .then(pool => {
        console.log('Connected to SQL Server');

        // Step 2: Create a new database
        return pool.request().query('CREATE DATABASE YourNewDatabaseName');
    })
    .then(result => {
        console.log('Database created successfully:', result);
        sql.close(); // Close the connection after the database is created
    })
    .catch(err => {
        console.error('Database creation failed:', err);
        sql.close(); // Close the connection on error
    });
```

3. than you can add the database name to the configuration object

```javascript
const config = {
    user: 'TestUser',
    password: 'TestUserPassword',
    server: 'localhost',
    database: 'YourDatabaseName',
    port: 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};
```