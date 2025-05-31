import NodeFactory from '../Factory/NodeFactory';

// Create a proper React component for the counter content
const CounterContent = ({ state, updateState }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div
        style={{
          fontSize: '24px',
          textAlign: 'center',
          color: '#334155',
          fontWeight: '600',
          padding: '16px',
          backgroundColor: '#f1f5f9',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}
      >
        {state.count}
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button
          onClick={() => updateState('count')(state.count - 1)}
          style={{
            padding: '12px 24px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            backgroundColor: '#f8fafc',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            color: '#334155',
            transition: 'all 0.2s ease-in-out',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#f1f5f9';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#f8fafc';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          -
        </button>
        <button
          onClick={() => updateState('count')(state.count + 1)}
          style={{
            padding: '12px 24px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            backgroundColor: '#f8fafc',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            color: '#334155',
            transition: 'all 0.2s ease-in-out',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#f1f5f9';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#f8fafc';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

// Create the CounterNode using NodeFactory
export const CounterNode = NodeFactory.createNode({
  type: 'counter',
  title: 'Counter',
  inputs: [{ id: 'reset' }],
  outputs: [{ id: 'value' }],
  defaultData: {
    count: 0,
  },
  renderContent: ({ state, updateState }) => (
    <CounterContent state={state} updateState={updateState} />
  ),
});
