// --- MERN Kanban Board Backend: server.js ---
// This file sets up the Express server and defines the REST API routes.

// 1. Core Imports
const express = require('express');
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const cors = require('cors'); // Middleware to allow cross-origin requests from your React frontend
const crypto = require('crypto'); // Used to generate unique IDs for tasks

// 2. Initialize the App
const app = express();
const PORT = 3000; // Standard port for local API development

// 3. Apply Middleware
// IMPORTANT: Configure CORS to only allow your React frontend's URL in a production environment
app.use(cors()); 
app.use(bodyParser.json()); // Allows the server to accept JSON data in POST/PUT requests

// 4. In-Memory Data Store (Temporary: This will be replaced by MongoDB/Mongoose)
let tasks = [
    { id: crypto.randomUUID(), title: 'Setup Node.js Server', status: 'To Do', description: 'Initialize package.json and install Express/CORS.', priority: 'High' },
    { id: crypto.randomUUID(), title: 'Design MongoDB Schema', status: 'In Progress', description: 'Define models for Users, Boards, and Tasks.', priority: 'Medium' },
    { id: crypto.randomUUID(), title: 'Build React Frontend', status: 'To Do', description: 'Scaffold the main App component and basic layout.', priority: 'High' }
];


// --- MONGODB INTEGRATION GUIDANCE ---
//
// 1. Installation: You will need to install 'mongoose': npm install mongoose
// 2. Connection: Use mongoose.connect() here to connect to your MongoDB instance.
// 3. Schema: Define your Task model schema (TaskSchema) using Mongoose.
//
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/kanban_db')
// ... create Task model
// ------------------------------------


// 5. REST API Routes (Task Endpoints)

// Route 1: GET /api/tasks
// Retrieves all tasks (equivalent to db.tasks.find({}) )
app.get('/api/tasks', (req, res) => {
    console.log('GET request received for all tasks');
    // In a real Mongoose setup: Task.find().then(tasks => res.json(tasks))
    res.json(tasks); 
});

// Route 2: POST /api/tasks
// Creates a new task
app.post('/api/tasks', (req, res) => {
    const { title, description, status, priority } = req.body;

    if (!title || !status) {
        // Basic validation check
        return res.status(400).json({ message: 'Title and Status are required.' });
    }

    const newTask = {
        id: crypto.randomUUID(), // Generate unique ID
        title,
        description: description || '',
        status: status, // e.g., 'To Do', 'In Progress', 'Done'
        priority: priority || 'Medium',
        createdAt: new Date(),
    };

    tasks.push(newTask); // Add to our temporary array
    console.log(`POST request: New task created with ID ${newTask.id}`);

    // Send back the created task (with its ID)
    // In a real Mongoose setup: const savedTask = await Task.create(req.body); res.status(201).json(savedTask);
    res.status(201).json(newTask); 
});

// Route 3: PUT /api/tasks/:id
// Updates an existing task (e.g., changing its status or description)
app.put('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const updates = req.body;

    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found.' });
    }

    // Apply updates (title, description, status, priority)
    tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
    console.log(`PUT request: Task ${taskId} updated.`);

    // In a real Mongoose setup: Task.findByIdAndUpdate(taskId, updates, { new: true })
    res.json(tasks[taskIndex]);
});


// 6. Start the Server
app.listen(PORT, () => {
    console.log(`Kanban API Server is running on http://localhost:${PORT}`);
    console.log('To test: Try GET http://localhost:3000/api/tasks in your browser/tool.');
});