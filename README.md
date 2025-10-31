# MERN Stack Project: Collaborative Kanban Board API

This repository contains the foundational **Node.js/Express backend API** for a full-stack project management tool (Kanban Board), similar to a simplified Trello.

This project is a high-value demonstration of modern full-stack skills, including API design, database modeling, and decoupled service architecture.

## 🚀 Status: Phase 1 (Backend API & Data Layer)

The API is fully functional for all basic CRUD operations on tasks, using Express and an in-memory array for temporary data persistence.

**Next Steps (Phase 2):** MongoDB Integration using Mongoose and implementing User Authentication (JWT).

## 💡 Key Features of the API

* **RESTful Endpoints:** Standard CRUD operations for task management.

* **Decoupled Architecture:** Designed to serve a separate React frontend.

* **Core Dependencies:** Express.js, CORS, body-parser.

## 🛠️ How to Run Locally

1. **Clone the Repository:**

git clone [your-repo-url] cd mern-kanban-api

2. **Install Dependencies:**

npm install


3. **Start the Server:**

npm start

Server will start on http://localhost:3000

## API Endpoints (Currently Available)

| Method | Endpoint | Description | 
| ----- | ----- | ----- | 
| `GET` | `/api/tasks` | Retrieve all tasks. | 
| `POST` | `/api/tasks` | Create a new task. | 
| `PUT` | `/api/tasks/:id` | Update an existing task (e.g., change status/description). | 
| `DELETE` | `/api/tasks/:id` | Delete a task. |
