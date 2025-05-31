// inputNode.js

import NodeFactory from './NodeFactory';

// Create a proper React component for the input content
const InputContent = ({ state, updateState }) => {
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: '100%',
        }}
      >
        <label
          style={{
            fontSize: '12px',
            color: '#64748b',
            fontWeight: '500',
          }}
        >
          Input Type
        </label>
        <select
          value={state.type}
          onChange={(e) => updateState('type')(e.target.value)}
          style={{
            width: '100%',
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
          }}
        >
          <option value='text'>Text</option>
          <option value='file'>File</option>
        </select>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: '100%',
        }}
      >
        <label
          style={{
            fontSize: '12px',
            color: '#64748b',
            fontWeight: '500',
          }}
        >
          Input Name
        </label>
        <input
          type='text'
          value={state.name}
          onChange={(e) => updateState('name')(e.target.value)}
          placeholder='Enter input name...'
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
        />
      </div>

      {state.type === 'text' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%',
          }}
        >
          <label
            style={{
              fontSize: '12px',
              color: '#64748b',
              fontWeight: '500',
            }}
          >
            Default Value
          </label>
          <input
            type='text'
            value={state.defaultValue}
            onChange={(e) => updateState('defaultValue')(e.target.value)}
            placeholder='Enter default value...'
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
          />
        </div>
      )}

      {state.type === 'file' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%',
          }}
        >
          <label
            style={{
              fontSize: '12px',
              color: '#64748b',
              fontWeight: '500',
            }}
          >
            File Input
          </label>
          <input
            type='file'
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                updateState('defaultValue')(file.name);
              }
            }}
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
          />
        </div>
      )}
    </div>
  );
};

// Create the InputNode using NodeFactory
export const InputNode = NodeFactory.createNode({
  type: 'input',
  title: 'Input',
  inputs: [],
  outputs: [{ id: 'value' }],
  defaultData: {
    type: 'text',
    name: '',
    defaultValue: '',
  },
  renderContent: ({ state, updateState }) => (
    <InputContent state={state} updateState={updateState} />
  ),
});
