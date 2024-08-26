# Project Management Web Application

## Overview

This is a full-featured Project Management Web Application developed with a focus on efficient project tracking and task management. It includes both frontend and backend components to provide a comprehensive solution for managing projects and tasks.

## Features

- **Project Management**: Create, update, and view projects.
- **Task Management**: Add, edit, and view tasks associated with each project.
- **User Authentication**: Secure user login and registration.
- **Advanced Filtering**: Filter projects and tasks based on various criteria.
- **Due Dates**: Manage and display due dates for projects and tasks.

## Technologies

### Frontend

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript for adding type safety.
- **Redux Toolkit**: State management library.
- **React Router**: Routing library for navigating between pages.
- **Ant Design (antd)**: UI components library for building a sleek and responsive interface.
- **SCSS**: Sassy CSS for advanced styling.

### Backend

- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for Node.js.
- **MySQL**: Relational database for storing project and task data.

## Setup

### Prerequisites

- Node.js and npm installed.
- MySQL database setup.

### Frontend

1. Clone the repository:

   ```bash
   git clone <repository-url>

Navigate to the frontend directory:
cd project-management-frontend

Install dependencies:
npm install

Start the development server:
npm start

Backend:
Navigate to the backend directory:
cd project-management-app

Install dependencies:
npm install

Set up environment variables:

Create a .env file and add your database configuration and JWT:

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=password

DB_NAME=project_management

JWT_SECRET=jwt_secret

Start the server:
npm start

Documentation:

The API is documented on Postman. You can view the documentation https://documenter.getpostman.com/view/37648564/2sAXjF9EzN

Testing:

This project includes tests for user registration, login, project management, and task management using Jest and Supertest. The test setup involves creating a fresh database and using mock data for each test.

Test Setup:

Create a .env.test file in the root directory with the following content:

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=password

DB_NAME=project_management

JWT_SECRET=jwt_secret

Test Files:

Setup: setupTests.ts - Contains setup and teardown logic for the test database.

User Routes: user.test.ts - Tests for user registration and login.

Project Routes: project.test.ts - Tests for project creation, retrieval, update, and deletion.

Task Routes: task.test.ts - Tests for task creation, retrieval, update, and deletion.

Running Tests:

To run the tests, use the following command:
npm test

This will execute the Jest test suite, which will:

Create a fresh database schema.

Populate the database with mock data.

Run the test cases.

Clear the database after tests are complete.

Drop the tables and close the database connection.
