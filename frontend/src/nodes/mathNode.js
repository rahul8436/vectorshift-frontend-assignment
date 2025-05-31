import NodeFactory from './NodeFactory';

// Create a proper React component for the math content
const MathContent = ({ state, updateState }) => {
  const calculateResult = () => {
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
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '16px',
      width: '100%',
      maxWidth: '300px',
      padding: '3px 5px',
      boxSizing: 'border-box',
      margin: '0 auto',
    }}>
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        padding: '0',
      }}>
        <input
          type='number'
          value={state.value1}
          onChange={(e) => updateState('value1')(Number(e.target.value))}
          style={{
            width: '80px',
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            backgroundColor: '#f8fafc',
            textAlign: 'center',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        <select
          value={state.operation}
          onChange={(e) => updateState('operation')(e.target.value)}
          style={{
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            backgroundColor: '#f8fafc',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            outline: 'none',
            boxSizing: 'border-box',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            backgroundSize: '16px',
            paddingRight: '36px',
            width: '80px',
          }}
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
          style={{
            width: '80px',
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            backgroundColor: '#f8fafc',
            textAlign: 'center',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#f1f5f9',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#334155',
          textAlign: 'center',
          border: '1px solid #e2e8f0',
          boxSizing: 'border-box',
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        = {calculateResult()}
      </div>
    </div>
  );
};

// Create the MathNode using NodeFactory
export const MathNode = NodeFactory.createNode({
  type: 'math',
  title: 'Math Operation',
  inputs: [{ id: 'value1' }, { id: 'value2' }],
  outputs: [{ id: 'result' }],
  defaultData: {
    operation: '+',
    value1: 0,
    value2: 0,
  },
  renderContent: ({ state, updateState }) => (
    <MathContent state={state} updateState={updateState} />
  ),
});
