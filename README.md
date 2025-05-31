# VectorShift Frontend Technical Assessment

This project consists of a React frontend and a FastAPI backend for building and managing node-based pipelines.

## Project Structure

```
.
├── frontend/          # React frontend application
├── backend/           # FastAPI backend server
└── README.md         # This file
```

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.7 or higher)
- pip (Python package manager)

## Installation

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a virtual environment (optional but recommended):

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install fastapi uvicorn python-multipart
   ```

## Running the Application

### Start the Backend Server

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend server will run on `http://localhost:8000`

### Start the Frontend Development Server

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Start the React development server:
   ```bash
   npm start
   ```
   The frontend application will run on `http://localhost:3000`

## Features

- Node-based pipeline builder
- Multiple node types (Input, Output, LLM, Text, etc.)
- Real-time pipeline validation
- Modern, responsive UI
- DAG (Directed Acyclic Graph) validation

## API Endpoints

- `GET /`: Health check endpoint
- `POST /pipelines/parse`: Parse and validate pipeline structure
  - Returns number of nodes, edges, and DAG validation result

## Development

- Frontend code is in the `frontend/src` directory
- Backend code is in the `backend/main.py` file
- The application uses React Flow for node-based UI
- FastAPI handles backend logic and pipeline validation

## Notes

- The backend server must be running for pipeline validation to work
- CORS is configured to allow requests from `http://localhost:3000`
- The frontend will automatically proxy API requests to the backend
