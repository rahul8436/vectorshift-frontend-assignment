# Node Creation Guide

## Overview

This guide explains how to create new nodes using our node abstraction system. The system uses a factory pattern to create nodes efficiently while maintaining consistent styling and behavior across all nodes.

## Node Factory Pattern

We use a factory pattern (`NodeFactory`) to create nodes, which provides:

- Consistent node structure through `BaseNode`
- Shared styling and layout patterns
- Standardized input/output handling
- Reusable components
- Automatic state management
- Consistent error handling

## Creating a New Node

### 1. Basic Structure

```javascript
import NodeFactory from './NodeFactory';

// Create a content component for your node
const MyNodeContent = ({ state, updateState }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        maxWidth: '300px',
        padding: '24px',
        boxSizing: 'border-box',
        margin: '0 auto',
      }}
    >
      {/* Your node's content here */}
    </div>
  );
};

// Create the node using NodeFactory
export const MyNode = NodeFactory.createNode({
  type: 'my-node',
  title: 'My Node',
  inputs: [{ id: 'input1' }],
  outputs: [{ id: 'output1' }],
  defaultData: {
    // Your default state here
  },
  renderContent: ({ state, updateState }) => (
    <MyNodeContent state={state} updateState={updateState} />
  ),
});
```

### 2. Required Properties

- `type`: Unique identifier for the node (used in nodeTypes registration)
- `title`: Display name of the node
- `inputs`: Array of input handle configurations
- `outputs`: Array of output handle configurations
- `defaultData`: Initial state for the node
- `renderContent`: Function to render the node's content

### 3. State Management

The NodeFactory automatically handles state management:

- Initializes state from `defaultData`
- Provides `updateState` function for each state field
- Syncs state with node data
- Handles state persistence

Example:

```javascript
const MyNodeContent = ({ state, updateState }) => {
  // state contains all fields from defaultData
  // updateState('fieldName') returns a function to update that field
  return (
    <input
      value={state.someValue}
      onChange={(e) => updateState('someValue')(e.target.value)}
    />
  );
};
```

### 4. Styling Guidelines

All nodes should follow these styling conventions:

- Container padding: `24px`
- Gap between elements: `16px`
- Input/textarea padding: `12px`
- Border radius: `8px`
- Font sizes: `12px` for labels, `14px` for content
- Colors:
  - Background: `#f8fafc`
  - Border: `#e2e8f0`
  - Text: `#334155`
  - Label: `#64748b`

### 5. Example Nodes

We have created several example nodes to demonstrate the abstraction:

1. MathNode: Performs basic arithmetic operations
2. ColorNode: Color picker with HEX and RGB outputs
3. TextNode: Text input with variable support
4. JsonNode: JSON input with validation
5. InputNode: Generic input with type selection
6. OutputNode: Generic output display
7. LLMNode: LLM integration with model selection
8. DateNode: Date formatting and manipulation
9. CounterNode: Simple counter with increment/decrement

### 6. Best Practices

1. Keep node content components separate from node definition
2. Use consistent styling patterns
3. Handle state updates through the updateState function
4. Provide clear labels and placeholders
5. Include error handling where appropriate
6. Use proper input validation
7. Maintain consistent spacing and alignment
8. Follow the established color scheme for node types

### 7. Registering New Nodes

After creating a new node, register it in `frontend/src/ui.js`:

```javascript
import { MyNode } from './nodes/myNode';

const nodeTypes = {
  // ... existing nodes
  'my-node': MyNode,
};
```

### 8. Testing New Nodes

When creating a new node:

1. Test all input/output connections
2. Verify state management
3. Check styling consistency
4. Ensure proper error handling
5. Validate user interactions
6. Test edge cases
7. Verify data persistence

## Conclusion

This abstraction system makes it easy to create new nodes while maintaining consistency across the application. By following these guidelines, you can quickly create new nodes that integrate seamlessly with the existing system.

The NodeFactory pattern significantly reduces code duplication and ensures consistent behavior across all nodes, making the system more maintainable and easier to extend.
