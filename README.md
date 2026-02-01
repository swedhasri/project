# EduBridge - Quality Education Platform

EduBridge is a full-stack web application designed to empower college students with quality education, mentorship, and smart learning tools.

## Features

- **Course System**: Browse, filter, and enroll in various courses (Web Dev, Data Science, Cyber Security, etc.).
- **Student Dashboard**: Track learning progress, view stats, and access enrolled courses.
- **Mentorship**: (UI) Connect with mentors.
- **Admin Panel**: Manage courses and students.
- **Authentication**: Secure JWT-based login and registration.
- **Responsive Design**: Modern UI with Tailwind CSS.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcryptjs

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB installed and running locally

### Installation

1.  **Clone the repository** (or unzip)

2.  **Setup Backend**
    ```bash
    cd server
    npm install
    ```
    - Create a `.env` file in `server/` (already provided in this project)
    - Run Data Seeder (optional, populates DB with demo data)
    ```bash
    npm run data:import
    ```
    - Start Server
    ```bash
    npm run server
    ```

3.  **Setup Frontend**
    ```bash
    cd client
    npm install
    npm run dev
    ```

4.  **Access Application**
    - Frontend: `http://localhost:5173`
    - Backend API: `http://localhost:5000`

## Demo Credentials

- **Admin User**: `admin@example.com` / `password123`
- **Student User**: `john@example.com` / `password123`

## API Documentation

- `POST /api/users` - Register user
- `POST /api/users/login` - Login user
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/enrollments` - Enroll in a course (Protected)
- `GET /api/enrollments/myenrollments` - Get user enrollments (Protected)

## Project Structure

- `client/`: React Frontend
- `server/`: Express Backend
  - `config/`: DB connection
  - `controllers/`: Request handlers
  - `models/`: Mongoose models
  - `routes/`: API routes
  - `middleware/`: Auth middleware
  - `data/`: Seeder data

---
Hackathon Ready Project
