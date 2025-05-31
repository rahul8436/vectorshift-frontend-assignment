# Node Development Template

## Step 1: Create Node File

Create a new file in `frontend/src/nodes/` with a descriptive name:

```bash
touch frontend/src/nodes/myNode.js
```

## Step 2: Basic Structure

```javascript
// myNode.js
import React from 'react';
import NodeFactory from './NodeFactory';

// Step 3: Define your node's content component
const MyNodeContent = ({ state, updateState }) => {
  return <div>{/* Your node's UI goes here */}</div>;
};

// Step 4: Create the node using NodeFactory
export const MyNode = NodeFactory.createNode({
  type: 'myNode', // Unique identifier
  title: 'My Node', // Display name
  inputs: [], // Input handles
  outputs: [], // Output handles
  defaultData: {
    // Initial state
    // Your state properties
  },
  renderContent: ({ state, updateState }) => (
    <MyNodeContent state={state} updateState={updateState} />
  ),
});
```

## Step 3: Add State Management

```javascript
const MyNodeContent = ({ state, updateState }) => {
  // Example state management
  const handleChange = (value) => {
    updateState('myValue')(value);
  };

  return (
    <div>
      <input
        value={state.myValue}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
```

## Step 4: Add Handles

```javascript
export const MyNode = NodeFactory.createNode({
  // ... other properties
  inputs: [{ id: 'input1' }, { id: 'input2' }],
  outputs: [{ id: 'output1' }],
  // ... rest of the configuration
});
```

## Step 5: Add Styling

```javascript
const styles = {
  container: {
    padding: '16px',
    borderRadius: '8px',
  },
  input: {
    padding: '8px',
    border: '1px solid #e2e8f0',
  },
};

const MyNodeContent = ({ state, updateState }) => {
  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        value={state.myValue}
        onChange={(e) => updateState('myValue')(e.target.value)}
      />
    </div>
  );
};
```

## Step 6: Add Validation

```javascript
const MyNodeContent = ({ state, updateState }) => {
  const validateInput = (value) => {
    // Add your validation logic
    return value.length > 0;
  };

  const handleChange = (value) => {
    if (validateInput(value)) {
      updateState('myValue')(value);
    }
  };

  return (
    <div>
      <input
        value={state.myValue}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
```

## Step 7: Add Error Handling

```javascript
const MyNodeContent = ({ state, updateState }) => {
  const [error, setError] = useState(null);

  const handleChange = (value) => {
    try {
      // Your logic here
      updateState('myValue')(value);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <input
        value={state.myValue}
        onChange={(e) => handleChange(e.target.value)}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};
```

## Step 8: Add to Node Registry

In `frontend/src/nodes/index.js`:

```javascript
export { MyNode } from './myNode';
```

## Step 9: Add to Toolbar

In `frontend/src/components/Toolbar.js`:

```javascript
import { MyNode } from '../nodes';

// Add to nodeTypes
const nodeTypes = {
  // ... other nodes
  myNode: MyNode,
};

// Add to toolbar items
const toolbarItems = [
  // ... other items
  {
    type: 'myNode',
    label: 'My Node',
    description: 'Description of my node',
  },
];
```

## Complete Example

```javascript
// myNode.js
import React, { useState } from 'react';
import NodeFactory from './NodeFactory';

const styles = {
  container: {
    padding: '16px',
    borderRadius: '8px',
  },
  input: {
    padding: '8px',
    border: '1px solid #e2e8f0',
  },
  error: {
    color: 'red',
    fontSize: '12px',
  },
};

const MyNodeContent = ({ state, updateState }) => {
  const [error, setError] = useState(null);

  const validateInput = (value) => {
    return value.length > 0;
  };

  const handleChange = (value) => {
    try {
      if (validateInput(value)) {
        updateState('myValue')(value);
        setError(null);
      } else {
        setError('Input cannot be empty');
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        value={state.myValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder='Enter value...'
      />
      {error && <div style={styles.error}>{error}</div>}
    </div>
  );
};

export const MyNode = NodeFactory.createNode({
  type: 'myNode',
  title: 'My Node',
  inputs: [{ id: 'input1' }, { id: 'input2' }],
  outputs: [{ id: 'output1' }],
  defaultData: {
    myValue: '',
  },
  renderContent: ({ state, updateState }) => (
    <MyNodeContent state={state} updateState={updateState} />
  ),
});
```

## Testing Your Node

1. Start the development server
2. Add your node to the canvas
3. Test all functionality:
   - Input/output connections
   - State updates
   - Error handling
   - Styling
   - Responsiveness

## Best Practices

1. Keep components focused and single-purpose
2. Use meaningful variable and function names
3. Add comments for complex logic
4. Handle all edge cases
5. Provide user feedback
6. Follow the established styling patterns
7. Test thoroughly before committing
