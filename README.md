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

## Node Abstraction

The project uses a robust node abstraction system to make creating and maintaining nodes easier. The abstraction consists of two main components:

### 1. BaseNode Component

Located in `frontend/src/nodes/BaseNode.js`, this component provides:

- Common node structure and layout
- Handle management (inputs/outputs)
- Consistent styling and animations
- Delete functionality
- Hover effects

### 2. NodeFactory

Located in `frontend/src/nodes/NodeFactory.js`, this factory provides:

- Declarative node creation
- State management
- Common UI components
- Styling utilities

### Creating a New Node

To create a new node:

1. Create a new file in `frontend/src/nodes/` (e.g., `myNode.js`)
2. Define your node's content component
3. Use NodeFactory to create the node:

```javascript
import NodeFactory from './NodeFactory';

// Define your node's content
const MyNodeContent = ({ state, updateState }) => {
  return <div>{/* Your node's UI */}</div>;
};

// Create the node using NodeFactory
export const MyNode = NodeFactory.createNode({
  type: 'myNode',
  title: 'My Node',
  inputs: [{ id: 'input1' }],
  outputs: [{ id: 'output1' }],
  defaultData: {
    // Your node's default state
  },
  renderContent: ({ state, updateState }) => (
    <MyNodeContent state={state} updateState={updateState} />
  ),
});
```

### Example Nodes

The project includes several example nodes demonstrating the abstraction:

1. **Counter Node**: Simple counter with increment/decrement
2. **Math Node**: Basic arithmetic operations
3. **Color Picker Node**: Color selection and manipulation
4. **Date Formatter Node**: Date formatting and parsing
5. **JSON Parser Node**: JSON validation and formatting

### Benefits of the Abstraction

1. **Code Reduction**: New nodes require minimal boilerplate
2. **Consistency**: All nodes share the same structure and styling
3. **Maintainability**: Changes to common functionality affect all nodes
4. **Flexibility**: Easy to add new features to all nodes

### Best Practices

1. Keep node content components focused on UI
2. Use NodeFactory's utility methods for common UI elements
3. Follow the established styling patterns
4. Document any node-specific functionality

## Notes

- The backend server must be running for pipeline validation to work
- CORS is configured to allow requests from `http://localhost:3000`
- The frontend will automatically proxy API requests to the backend
