# 📝 Personal Task Manager

## Project Title & Brief Description

I have chosen **Exercise 1: Personal Task Manager** for this assessment. This is a full-stack task management application that allows users to create, view, update, and delete tasks. The application features task filtering by status (All, Active, Completed), search functionality, overdue task highlighting, and a responsive design that works seamlessly on both desktop and mobile devices. The frontend is built with React and TailwindCSS, while the backend uses Node.js with Express and file-based JSON storage for data persistence.

## Live Demo Links

- **Frontend (Netlify/Vercel):** https://personall-task-manager.netlify.app/
- **Backend (Render/Railway):** https://task-manager-0jun.onrender.com

## Tech Stack

### Frontend

Technology 
React 18 -  UI library for building component-based interfaces 
Vite     -  Fast build tool and development server 
TailwindCSS - Utility-first CSS framework for rapid UI development 
Lucide React - Beautiful, consistent icon library 
Axios - HTTP client for API requests 

### Backend
Technology 
Node.js - JavaScript runtime for server-side code 
Express.js - Web framework for building REST APIs 
CORS - Enable cross-origin requests from frontend 
File System (FS) - JSON file-based storage for data persistence 

### Why these choices?
- React + Vite : Fast development experience with hot module replacement
- TailwindCSS : No separate CSS files, responsive design made easy
- Lucide Icons : Clean, customizable icons that match modern UI
- Express : Lightweight, minimal backend framework
- JSON File Storage : Simple persistence without database setup overhead

## How to Run Locally

### Prerequisites
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

### Step-by-Step Instructions

#### 1. Clone the Repository
```bash
git clone https://github.com/Kkiran28/task1-task-Managerr.git
cd Task-Manager-Task1

---> Setup Backend Server

  cd server
  npm install
  npm run dev

  ✅ Server running on http:localhost:3000
  📝 API endpoint: http://localhost:3000/api/tasks

--->Setup Frontend Application
  
  cd client
  npm install
  npm run dev   
          ➜ Local: http://localhost:5173/

--->API Documentation
   
   Base URL -- http://localhost:3000/api

   Endpoints :-
      1.) GET all tasks  - Retrieves all tasks from the database.
         METHOD - GET
         PATH   - /tasks
         Response (200 OK):
        [
            {
              "id": "1743123456789",
              "title": "Design Homepage UI",
              "description": "Create responsive homepage",
              "dueDate": "2024-05-25",
              "status": "active",
              "completed": false,
              "createdAt": "2024-05-20T10:00:00.000Z"
            }
        ]


        2.) POST create task  - Creates a new task
        METHOD - POST
        PATH   - /tasks
        Request Body:
            {
              "title": "Complete Project",      // Required
              "description": "Finish all tasks", // Optional
              "dueDate": "2024-12-31",          // Optional
              "status": "active"                 // Optional (default: active)
            }

        Response (201 Created):
            {
              "message": "Task created successfully",
              "task": {
              "id": "1743123456790",
              "title": "Complete Project",
              "description": "Finish all tasks",
              "dueDate": "2024-12-31",
              "status": "active",
              "completed": false,
              "createdAt": "2024-05-20T10:00:00.000Z"
            }
        }

        Error Response (400 Bad Request):
        {
          "error": "Title is required"
        }

        3.) PUT update task  - Updates an existing task
        METHOD - PUT
        PATH   - /tasks/:id
        Request Body:
            {
              "title": "Updated Title",          // Optional
              "description": "Updated desc", // Optional
              "dueDate": "2024-12-31",           // Optional
              "status": "active"                 // Optional 
            }

        Response (201 Created):
            {
              "message": "Task updated successfully",
              "task": {
                "id": "1780464229433",
                "title": "Updated Title",
                "description": "Updated desc",
                "dueDate": "2024-12-31",
                "priority": "high",
                "completed": false,
                "createdAt": "2026-06-03T05:23:49.433Z"
            }
        }
        
        4.) DELETE task - Deletes a task by ID.
        METHOD - PUT
        PATH   - /tasks/:id
         Response (200 OK):
           {
             "message": "Task deleted successfully"
           }

--->Project Structure
Task-Manager-Task1/
│
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   │   ├── Dashboard.jsx       # Main dashboard view
│   │   │   ├── TaskList.jsx        # Task listing component
│   │   │   ├── TaskItem.jsx        # Individual task item
│   │   │   ├── TaskForm.jsx        # Add/Edit task modal
│   │   │   ├── TaskStats.jsx       # Statistics cards
│   │   │   ├── SearchBar.jsx       # Search input component
│   │   │   ├── FilterButtons.jsx   # Status filter buttons
│   │   │   └── Notification.jsx    # Toast notifications
│   │   ├── hooks/
│   │   │   └── useTasks.js         # Custom hook for task state
│   │   ├── services/
│   │   │   └── api.js              # API service layer
│   │   ├── App.jsx                 # Main App component
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Global styles + Tailwind
│   ├── index.html                  # HTML template
│   ├── package.json                # Frontend dependencies
│   └── vite.config.js              # Vite configuration
│
├── server/                          # Backend Node.js application
│   ├── data/
│   │   └── tasks.json              # JSON file storage
│   ├── server.js                   # Express server setup AND CRUD operation
│   └── package.json                # Backend dependencies
│
└── README.md                        # Project documentation
│
└── .gitignore