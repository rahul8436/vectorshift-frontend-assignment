# Node Development Guide

## Table of Contents

1. [Node Abstraction Overview](#node-abstraction-overview)
2. [Creating New Nodes](#creating-new-nodes)
3. [Node Patterns](#node-patterns)
4. [Styling Guidelines](#styling-guidelines)
5. [Best Practices](#best-practices)
6. [Example Nodes](#example-nodes)

## Node Abstraction Overview

The node system uses a two-layer abstraction:

### 1. BaseNode Component

`BaseNode.js` provides the foundation for all nodes:

```javascript
// Example of BaseNode usage
<BaseNode
  id='my-node'
  title='My Node'
  inputs={[{ id: 'input1' }]}
  outputs={[{ id: 'output1' }]}
>
  {/* Node content */}
</BaseNode>
```

Features:

- Consistent node structure
- Handle management
- Delete functionality
- Hover effects
- Styling consistency

### 2. NodeFactory

`NodeFactory.js` provides a declarative way to create nodes:

```javascript
// Example of NodeFactory usage
const MyNode = NodeFactory.createNode({
  type: 'myNode',
  title: 'My Node',
  inputs: [{ id: 'input1' }],
  outputs: [{ id: 'output1' }],
  defaultData: {
    value: '',
  },
  renderContent: ({ state, updateState }) => (
    <MyNodeContent state={state} updateState={updateState} />
  ),
});
```

## Creating New Nodes

### Basic Node

```javascript
// basicNode.js
import NodeFactory from './NodeFactory';

const BasicNodeContent = ({ state, updateState }) => {
  return (
    <div>
      <input
        value={state.value}
        onChange={(e) => updateState('value')(e.target.value)}
      />
    </div>
  );
};

export const BasicNode = NodeFactory.createNode({
  type: 'basic',
  title: 'Basic Node',
  inputs: [{ id: 'input' }],
  outputs: [{ id: 'output' }],
  defaultData: {
    value: '',
  },
  renderContent: ({ state, updateState }) => (
    <BasicNodeContent state={state} updateState={updateState} />
  ),
});
```

### Node with Multiple Inputs/Outputs

```javascript
// multiPortNode.js
import NodeFactory from './NodeFactory';

const MultiPortNodeContent = ({ state, updateState }) => {
  return (
    <div>
      <div>Input 1: {state.input1}</div>
      <div>Input 2: {state.input2}</div>
      <div>Output: {state.output}</div>
    </div>
  );
};

export const MultiPortNode = NodeFactory.createNode({
  type: 'multiPort',
  title: 'Multi-Port Node',
  inputs: [{ id: 'input1' }, { id: 'input2' }],
  outputs: [{ id: 'output1' }, { id: 'output2' }],
  defaultData: {
    input1: '',
    input2: '',
    output: '',
  },
  renderContent: ({ state, updateState }) => (
    <MultiPortNodeContent state={state} updateState={updateState} />
  ),
});
```

## Node Patterns

### 1. State Management Pattern

```javascript
const StatefulNodeContent = ({ state, updateState }) => {
  // Local state for UI
  const [localState, setLocalState] = useState({});

  // Update parent state
  const handleChange = (value) => {
    updateState('value')(value);
  };

  return <div>{/* Node content */}</div>;
};
```

### 2. Dynamic Handles Pattern

```javascript
const DynamicHandleNode = NodeFactory.createNode({
  type: 'dynamic',
  title: 'Dynamic Handles',
  inputs: (data) => {
    // Generate inputs based on data
    return data.variables.map((v) => ({ id: v }));
  },
  outputs: [{ id: 'output' }],
  defaultData: {
    variables: ['input1', 'input2'],
  },
  renderContent: ({ state, updateState }) => (
    <DynamicContent state={state} updateState={updateState} />
  ),
});
```

### 3. Validation Pattern

```javascript
const ValidatingNodeContent = ({ state, updateState }) => {
  const validateInput = (value) => {
    // Validation logic
    return value.length > 0;
  };

  const handleChange = (value) => {
    if (validateInput(value)) {
      updateState('value')(value);
    }
  };

  return <div>{/* Node content */}</div>;
};
```

## Styling Guidelines

### 1. Common Styles

```javascript
const commonStyles = {
  container: {
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
  },
  input: {
    padding: '8px',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
  },
  label: {
    fontSize: '12px',
    color: '#64748b',
  },
};
```

### 2. Node-Specific Styles

```javascript
const nodeStyles = {
  special: {
    border: '2px solid #14b8a6',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
};
```

## Best Practices

1. **Component Organization**

   - Separate content components from node definitions
   - Use meaningful component and variable names
   - Keep components focused and single-purpose

2. **State Management**

   - Use NodeFactory's state management
   - Keep state updates predictable
   - Validate state changes

3. **Error Handling**

   - Validate inputs
   - Provide user feedback
   - Handle edge cases

4. **Performance**
   - Memoize expensive calculations
   - Use callbacks for event handlers
   - Optimize re-renders

## Example Nodes

### 1. Counter Node

```javascript
// counterNode.js
import NodeFactory from './NodeFactory';

const CounterContent = ({ state, updateState }) => {
  return (
    <div>
      <button onClick={() => updateState('count')(state.count - 1)}>-</button>
      <span>{state.count}</span>
      <button onClick={() => updateState('count')(state.count + 1)}>+</button>
    </div>
  );
};

export const CounterNode = NodeFactory.createNode({
  type: 'counter',
  title: 'Counter',
  inputs: [],
  outputs: [{ id: 'value' }],
  defaultData: {
    count: 0,
  },
  renderContent: ({ state, updateState }) => (
    <CounterContent state={state} updateState={updateState} />
  ),
});
```

### 2. Math Node

```javascript
// mathNode.js
import NodeFactory from './NodeFactory';

const MathContent = ({ state, updateState }) => {
  const calculate = () => {
    switch (state.operation) {
      case '+':
        return state.value1 + state.value2;
      case '-':
        return state.value1 - state.value2;
      case '*':
        return state.value1 * state.value2;
      case '/':
        return state.value2 !== 0 ? state.value1 / state.value2 : 'Error';
      default:
        return 'Invalid operation';
    }
  };

  return (
    <div>
      <input
        type='number'
        value={state.value1}
        onChange={(e) => updateState('value1')(Number(e.target.value))}
      />
      <select
        value={state.operation}
        onChange={(e) => updateState('operation')(e.target.value)}
      >
        <option value='+'>+</option>
        <option value='-'>-</option>
        <option value='*'>×</option>
        <option value='/'>÷</option>
      </select>
      <input
        type='number'
        value={state.value2}
        onChange={(e) => updateState('value2')(Number(e.target.value))}
      />
      <div>= {calculate()}</div>
    </div>
  );
};

export const MathNode = NodeFactory.createNode({
  type: 'math',
  title: 'Math',
  inputs: [],
  outputs: [{ id: 'result' }],
  defaultData: {
    value1: 0,
    value2: 0,
    operation: '+',
  },
  renderContent: ({ state, updateState }) => (
    <MathContent state={state} updateState={updateState} />
  ),
});
```

### 3. Color Picker Node

```javascript
// colorNode.js
import NodeFactory from './NodeFactory';

const ColorContent = ({ state, updateState }) => {
  return (
    <div>
      <input
        type='color'
        value={state.color}
        onChange={(e) => updateState('color')(e.target.value)}
      />
      <div style={{ color: state.color }}>Selected Color: {state.color}</div>
    </div>
  );
};

export const ColorNode = NodeFactory.createNode({
  type: 'color',
  title: 'Color Picker',
  inputs: [],
  outputs: [{ id: 'color' }],
  defaultData: {
    color: '#000000',
  },
  renderContent: ({ state, updateState }) => (
    <ColorContent state={state} updateState={updateState} />
  ),
});
```

### 4. Date Formatter Node

```javascript
// dateNode.js
import NodeFactory from './NodeFactory';

const DateContent = ({ state, updateState }) => {
  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString(state.format);
    } catch (e) {
      return 'Invalid Date';
    }
  };

  return (
    <div>
      <input
        type='date'
        value={state.date}
        onChange={(e) => updateState('date')(e.target.value)}
      />
      <select
        value={state.format}
        onChange={(e) => updateState('format')(e.target.value)}
      >
        <option value='en-US'>US</option>
        <option value='en-GB'>UK</option>
        <option value='de-DE'>German</option>
      </select>
      <div>Formatted: {formatDate(state.date)}</div>
    </div>
  );
};

export const DateNode = NodeFactory.createNode({
  type: 'date',
  title: 'Date Formatter',
  inputs: [],
  outputs: [{ id: 'formatted' }],
  defaultData: {
    date: new Date().toISOString().split('T')[0],
    format: 'en-US',
  },
  renderContent: ({ state, updateState }) => (
    <DateContent state={state} updateState={updateState} />
  ),
});
```

### 5. JSON Parser Node

```javascript
// jsonNode.js
import NodeFactory from './NodeFactory';

const JsonContent = ({ state, updateState }) => {
  const parseJson = (json) => {
    try {
      return JSON.stringify(JSON.parse(json), null, 2);
    } catch (e) {
      return 'Invalid JSON';
    }
  };

  return (
    <div>
      <textarea
        value={state.json}
        onChange={(e) => updateState('json')(e.target.value)}
        placeholder='Enter JSON...'
      />
      <div>
        <pre>{parseJson(state.json)}</pre>
      </div>
    </div>
  );
};

export const JsonNode = NodeFactory.createNode({
  type: 'json',
  title: 'JSON Parser',
  inputs: [],
  outputs: [{ id: 'parsed' }],
  defaultData: {
    json: '{}',
  },
  renderContent: ({ state, updateState }) => (
    <JsonContent state={state} updateState={updateState} />
  ),
});
```
