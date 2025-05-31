# Node Development Guide

## Table of Contents

1. [Node Structure](#node-structure)
2. [Creating a New Node](#creating-a-new-node)
3. [Registering Nodes in UI](#registering-nodes-in-ui)
4. [Adding Nodes to Toolbar](#adding-nodes-to-toolbar)
5. [Node Patterns](#node-patterns)
6. [Best Practices](#best-practices)

## Node Structure

Each node consists of:

- A content component (UI)
- Node configuration (type, inputs, outputs)
- State management
- Handle connections

## Creating a New Node

1. Create a new file in `src/nodes/` (e.g., `MyNode.js`)
2. Define your node content component
3. Create the node using NodeFactory
4. Export the node

Example:

```javascript
import React from 'react';
import NodeFactory from './NodeFactory';

const MyNodeContent = ({ state, updateState }) => {
  return (
    <div>
      <input
        value={state.input}
        onChange={(e) => updateState('input')(e.target.value)}
      />
    </div>
  );
};

export const MyNode = NodeFactory.createNode({
  type: 'myNode',
  title: 'My Node',
  inputs: [{ id: 'input' }],
  outputs: [{ id: 'output' }],
  defaultData: {
    input: '',
  },
  renderContent: ({ state, updateState }) => (
    <MyNodeContent state={state} updateState={updateState} />
  ),
});
```

## Registering Nodes in UI

After creating your node, you need to register it in `UI.js`:

1. Import your node in `UI.js`:

```javascript
import { MyNode } from './nodes/MyNode';
```

2. Add it to the `nodeTypes` object:

```javascript
const nodeTypes = {
  myNode: MyNode,
  // ... other nodes
};
```

3. Pass `nodeTypes` to the ReactFlow component:

```javascript
<ReactFlow
  nodes={nodes}
  edges={edges}
  nodeTypes={nodeTypes}
  // ... other props
/>
```

## Adding Nodes to Toolbar

To make your node available in the toolbar:

1. Import your node in `Toolbar.js`:

```javascript
import { MyNode } from './nodes/MyNode';
```

2. Add it to the toolbar items:

```javascript
const toolbarItems = [
  {
    type: 'myNode',
    label: 'My Node',
    icon: '🔧', // Optional icon
    category: 'Basic', // Optional category
  },
  // ... other items
];
```

3. The node will now appear in the toolbar and can be dragged onto the canvas.

## Node Patterns

### 1. Input/Output Pattern

```javascript
const InputOutputNode = NodeFactory.createNode({
  type: 'inputOutput',
  inputs: [{ id: 'input' }],
  outputs: [{ id: 'output' }],
  // ...
});
```

### 2. Multiple Inputs Pattern

```javascript
const MultiInputNode = NodeFactory.createNode({
  type: 'multiInput',
  inputs: [{ id: 'input1' }, { id: 'input2' }],
  // ...
});
```

### 3. Multiple Outputs Pattern

```javascript
const MultiOutputNode = NodeFactory.createNode({
  type: 'multiOutput',
  outputs: [{ id: 'output1' }, { id: 'output2' }],
  // ...
});
```

### 4. State Management Pattern

```javascript
const StateNode = NodeFactory.createNode({
  type: 'state',
  defaultData: {
    value: 0,
    isActive: false,
  },
  // ...
});
```

## Best Practices

1. **Naming Conventions**

   - Use clear, descriptive names
   - Follow camelCase for variables
   - Use PascalCase for components

2. **State Management**

   - Keep state minimal
   - Use meaningful state keys
   - Initialize all state in defaultData

3. **Handle Management**

   - Use descriptive handle IDs
   - Document handle purposes
   - Validate handle connections

4. **Error Handling**

   - Validate inputs
   - Handle edge cases
   - Provide user feedback

5. **Performance**

   - Memoize expensive calculations
   - Avoid unnecessary re-renders
   - Use appropriate React hooks

6. **Documentation**
   - Document node purpose
   - Explain input/output behavior
   - Provide usage examples

## Example: Complete Node Implementation

Here's a complete example of a node with all features:

```javascript
import React from 'react';
import NodeFactory from './NodeFactory';

const ExampleNodeContent = ({ state, updateState }) => {
  return (
    <div>
      <input
        value={state.input}
        onChange={(e) => updateState('input')(e.target.value)}
        placeholder='Enter value...'
      />
      <div>Output: {state.input}</div>
    </div>
  );
};

export const ExampleNode = NodeFactory.createNode({
  type: 'example',
  title: 'Example Node',
  inputs: [{ id: 'input' }],
  outputs: [{ id: 'output' }],
  defaultData: {
    input: '',
  },
  renderContent: ({ state, updateState }) => (
    <ExampleNodeContent state={state} updateState={updateState} />
  ),
});
```

## Troubleshooting

Common issues and solutions:

1. **Node not appearing in toolbar**

   - Check node registration in UI.js
   - Verify toolbar item configuration
   - Check for console errors

2. **Handles not connecting**

   - Verify handle IDs match
   - Check handle types
   - Ensure proper handle positioning

3. **State not updating**

   - Check updateState calls
   - Verify state initialization
   - Check for state conflicts

4. **Performance issues**
   - Check for unnecessary re-renders
   - Verify memoization
   - Profile component performance
