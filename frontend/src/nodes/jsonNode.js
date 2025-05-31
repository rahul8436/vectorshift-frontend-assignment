import NodeFactory from './NodeFactory';

// Create a proper React component for the JSON content
const JsonContent = ({ state, updateState }) => {
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
          JSON Content
        </label>
        <textarea
          value={state.json}
          onChange={(e) => updateState('json')(e.target.value)}
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            lineHeight: '1.6',
            backgroundColor: '#f8fafc',
            resize: 'vertical',
            transition: 'all 0.2s ease-in-out',
            outline: 'none',
            boxSizing: 'border-box',
            fontFamily: 'monospace',
          }}
          placeholder='Enter JSON...'
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
          Preview
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
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
              }}
            >
          {(() => {
            try {
              const parsed = JSON.parse(state.json);
              return JSON.stringify(parsed, null, 2);
            } catch (e) {
              return 'Invalid JSON';
            }
          })()}
            </div>
      </div>
    </div>
  );
};

// Create the JsonNode using NodeFactory
export const JsonNode = NodeFactory.createNode({
  type: 'json',
  title: 'JSON',
  inputs: [{ id: 'json' }],
  outputs: [{ id: 'json' }],
  defaultData: {
    json: '{}',
  },
  renderContent: ({ state, updateState }) => (
    <JsonContent state={state} updateState={updateState} />
  ),
});
