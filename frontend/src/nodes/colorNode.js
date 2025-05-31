import NodeFactory from './NodeFactory';

// Create a proper React component for the color content
const ColorContent = ({ state, updateState }) => {
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const handleColorChange = (e) => {
    const hex = e.target.value;
    const rgb = hexToRgb(hex);
    updateState('hex')(hex);
    updateState('rgb')(rgb);
  };

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
          Color
        </label>
        <input
          type='color'
          value={state.hex}
          onChange={handleColorChange}
          style={{
            width: '100%',
            height: '44px',
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            backgroundColor: '#f8fafc',
            cursor: 'pointer',
            outline: 'none',
            boxSizing: 'border-box',
          }}
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
          HEX
        </label>
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
          {state.hex}
        </div>
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
          RGB
        </label>
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
          {state.rgb ? `rgb(${state.rgb.r}, ${state.rgb.g}, ${state.rgb.b})` : 'Invalid color'}
          </div>
      </div>
    </div>
  );
};

// Create the ColorNode using NodeFactory
export const ColorNode = NodeFactory.createNode({
  type: 'color',
  title: 'Color Picker',
  inputs: [],
  outputs: [{ id: 'hex' }, { id: 'rgb' }],
  defaultData: {
    hex: '#000000',
    rgb: { r: 0, g: 0, b: 0 },
  },
  renderContent: ({ state, updateState }) => (
    <ColorContent state={state} updateState={updateState} />
  ),
});
