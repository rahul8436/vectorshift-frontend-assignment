# Node Development Troubleshooting Guide

## Common Issues and Solutions

### 1. Node Not Appearing in Toolbar

**Symptoms:**

- Node is not visible in the toolbar
- Node cannot be dragged onto canvas

**Solutions:**

1. Check node registration:

   ```javascript
   // In frontend/src/nodes/index.js
   export { MyNode } from './myNode';
   ```

2. Verify toolbar configuration:

   ```javascript
   // In frontend/src/components/Toolbar.js
   const nodeTypes = {
     myNode: MyNode,
   };

   const toolbarItems = [
     {
       type: 'myNode',
       label: 'My Node',
     },
   ];
   ```

3. Check for console errors

### 2. Handles Not Working

**Symptoms:**

- Cannot connect nodes
- Handles not visible
- Connection errors

**Solutions:**

1. Verify handle configuration:

   ```javascript
   export const MyNode = NodeFactory.createNode({
     inputs: [{ id: 'input1' }], // Must have unique IDs
     outputs: [{ id: 'output1' }],
   });
   ```

2. Check handle styling:

   ```javascript
   // In BaseNode.js
   const handleStyle = {
     width: '10px',
     height: '10px',
     background: '#fff',
     border: '1px solid #1a192b',
   };
   ```

3. Ensure proper handle positioning

### 3. State Management Issues

**Symptoms:**

- State not updating
- Unexpected state changes
- State persistence issues

**Solutions:**

1. Check state updates:

   ```javascript
   const handleChange = (value) => {
     updateState('myValue')(value); // Correct
     // updateState('myValue', value);  // Incorrect
   };
   ```

2. Verify state initialization:

   ```javascript
   defaultData: {
     myValue: '',  // Must match state property name
   },
   ```

3. Check state access:
   ```javascript
   const MyNodeContent = ({ state, updateState }) => {
     console.log(state); // Debug state
     return <div>{state.myValue}</div>;
   };
   ```

### 4. Styling Problems

**Symptoms:**

- Inconsistent styling
- Layout issues
- Responsive design problems

**Solutions:**

1. Use common styles:

   ```javascript
   const styles = {
     container: {
       padding: '16px',
       borderRadius: '8px',
     },
   };
   ```

2. Check node dimensions:

   ```javascript
   const nodeStyle = {
     width: '200px', // Set appropriate width
     minHeight: '100px', // Set minimum height
   };
   ```

3. Verify responsive styles:
   ```javascript
   const styles = {
     container: {
       width: '100%',
       maxWidth: '300px',
     },
   };
   ```

### 5. Performance Issues

**Symptoms:**

- Slow rendering
- High CPU usage
- Memory leaks

**Solutions:**

1. Optimize re-renders:

   ```javascript
   const MyNodeContent = React.memo(({ state, updateState }) => {
     // Component logic
   });
   ```

2. Use callbacks:

   ```javascript
   const handleChange = useCallback(
     (value) => {
       updateState('myValue')(value);
     },
     [updateState]
   );
   ```

3. Memoize expensive calculations:
   ```javascript
   const result = useMemo(() => {
     return expensiveCalculation(state.value);
   }, [state.value]);
   ```

### 6. Error Handling

**Symptoms:**

- Uncaught exceptions
- Silent failures
- Poor error messages

**Solutions:**

1. Add try-catch blocks:

   ```javascript
   const handleChange = (value) => {
     try {
       // Risky operation
     } catch (error) {
       console.error('Error:', error);
       setError(error.message);
     }
   };
   ```

2. Validate inputs:

   ```javascript
   const validateInput = (value) => {
     if (!value) {
       throw new Error('Input cannot be empty');
     }
     return true;
   };
   ```

3. Show error messages:
   ```javascript
   return <div>{error && <div style={{ color: 'red' }}>{error}</div>}</div>;
   ```

### 7. Testing Issues

**Symptoms:**

- Tests failing
- Incomplete test coverage
- False positives

**Solutions:**

1. Write comprehensive tests:

   ```javascript
   describe('MyNode', () => {
     it('should render correctly', () => {
       // Test rendering
     });

     it('should handle state updates', () => {
       // Test state management
     });

     it('should validate inputs', () => {
       // Test validation
     });
   });
   ```

2. Test edge cases:

   ```javascript
   it('should handle empty input', () => {
     // Test empty input
   });

   it('should handle invalid input', () => {
     // Test invalid input
   });
   ```

3. Mock dependencies:
   ```javascript
   jest.mock('./NodeFactory', () => ({
     createNode: jest.fn(),
   }));
   ```

## Debugging Tips

1. **Console Logging**

   ```javascript
   console.log('State:', state);
   console.log('Props:', props);
   ```

2. **React DevTools**

   - Use React DevTools to inspect components
   - Check component hierarchy
   - Monitor state changes

3. **Network Tab**

   - Check API calls
   - Verify data flow
   - Monitor performance

4. **Performance Profiling**
   - Use React Profiler
   - Identify bottlenecks
   - Optimize rendering

## Common Patterns

### 1. State Management

```javascript
const MyNodeContent = ({ state, updateState }) => {
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

### 2. Error Handling

```javascript
const MyNodeContent = ({ state, updateState }) => {
  const [error, setError] = useState(null);

  const handleChange = (value) => {
    try {
      // Operation
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  return <div>{error && <div style={{ color: 'red' }}>{error}</div>}</div>;
};
```

### 3. Validation

```javascript
const MyNodeContent = ({ state, updateState }) => {
  const validateInput = (value) => {
    if (!value) {
      throw new Error('Input required');
    }
    return true;
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

## Getting Help

1. Check the documentation:

   - Node Development Guide
   - Node Template
   - API Reference

2. Review example nodes:

   - Counter Node
   - Math Node
   - Color Picker Node

3. Search for similar issues:

   - GitHub Issues
   - Stack Overflow
   - React Flow Documentation

4. Ask for help:
   - Team Chat
   - Code Review
   - Pair Programming
