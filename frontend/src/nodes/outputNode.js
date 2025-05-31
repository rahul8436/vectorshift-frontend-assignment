// outputNode.js

import NodeFactory from './NodeFactory';

// Create a proper React component for the output content
const OutputContent = ({ state, updateState }) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '16px',
      width: '100%',
      maxWidth: '300px',
      padding: '24px',
      boxSizing: 'border-box',
      margin: '0 auto',
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '8px',
        width: '100%',
      }}>
          <label
            style={{
              fontSize: '12px',
              color: '#64748b',
            fontWeight: '500',
            }}
          >
          Output Name
          </label>
          <input
            type='text'
          value={state.name}
          onChange={(e) => updateState('name')(e.target.value)}
            style={{
              width: '100%',
            padding: '12px',
              border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            backgroundColor: '#f8fafc',
            outline: 'none',
            boxSizing: 'border-box',
            }}
          placeholder='Enter output name...'
          />
        </div>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '8px',
        width: '100%',
      }}>
          <label
            style={{
              fontSize: '12px',
              color: '#64748b',
            fontWeight: '500',
            }}
          >
          Value
          </label>
        <div
            style={{
              width: '100%',
            padding: '12px',
            backgroundColor: '#f1f5f9',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#334155',
            textAlign: 'left',
              border: '1px solid #e2e8f0',
            wordBreak: 'break-all',
            boxSizing: 'border-box',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            }}
          >
          {state.value || 'No value set'}
        </div>
      </div>
    </div>
  );
};

// Create the OutputNode using NodeFactory
export const OutputNode = NodeFactory.createNode({
  type: 'output',
  title: 'Output',
  inputs: [{ id: 'value' }],
  outputs: [],
  defaultData: {
    name: '',
    value: '',
  },
  renderContent: ({ state, updateState }) => (
    <OutputContent state={state} updateState={updateState} />
  ),
});
