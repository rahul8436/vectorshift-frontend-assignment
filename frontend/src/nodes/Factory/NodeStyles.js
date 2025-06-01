// NodeStyles.js - Shared styles and abstractions for nodes

// Base container styles
export const nodeContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
  maxWidth: '300px',
  padding: '24px',
  boxSizing: 'border-box',
  margin: '0 auto',
};

// Label styles
export const labelStyles = {
  fontSize: '12px',
  color: '#64748b',
  fontWeight: '500',
};

// Input/Select base styles
export const inputBaseStyles = {
  width: '100%',
  padding: '12px',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  fontSize: '14px',
  backgroundColor: '#f8fafc',
  outline: 'none',
  boxSizing: 'border-box',
};

// Select specific styles
export const selectStyles = {
  ...inputBaseStyles,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
  backgroundSize: '16px',
  paddingRight: '36px',
};

// Textarea specific styles
export const textareaStyles = {
  ...inputBaseStyles,
  minHeight: '100px',
  resize: 'none',
  overflow: 'hidden',
  lineHeight: '1.5',
};

// Field container styles
export const fieldContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
};

// Variables container styles
export const variablesContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '12px',
  backgroundColor: '#f1f5f9',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
};

// Variable item styles
export const variableItemStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px',
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  border: '1px solid #e2e8f0',
};

// Variable dot styles
export const variableDotStyles = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#14b8a6',
};

// Variable text styles
export const variableTextStyles = {
  fontSize: '14px',
  color: '#334155',
  fontFamily: 'monospace',
};

// Input selector styles
export const inputSelectorStyles = {
  position: 'absolute',
  top: '100%',
  left: '0',
  right: '0',
  backgroundColor: 'white',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  zIndex: 1000,
  maxHeight: '200px',
  overflowY: 'auto',
};

// Input selector item styles
export const inputSelectorItemStyles = {
  padding: '8px 16px',
  cursor: 'pointer',
  hover: {
    backgroundColor: '#f1f5f9',
  },
};

// Button base styles
export const buttonBaseStyles = {
  padding: '8px 16px',
  border: 'none',
  backgroundColor: '#e2e8f0',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#475569',
  transition: 'all 0.2s ease-in-out',
  ':hover': {
    backgroundColor: '#cbd5e1',
  },
};

// Counter value styles
export const counterValueStyles = {
  fontSize: '16px',
  fontWeight: '500',
  color: '#334155',
  fontFamily: 'monospace',
};

// Counter container styles
export const counterContainerStyles = {
  ...inputBaseStyles,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#f1f5f9',
};

// Helper function to create a field
export const createField = (label, input) => (
  <div style={fieldContainerStyles}>
    <label style={labelStyles}>{label}</label>
    {input}
  </div>
);

// Helper function to create a text input
export const createTextInput = (value, onChange, placeholder) => (
  <input
    type='text'
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={inputBaseStyles}
  />
);

// Helper function to create a select input
export const createSelect = (value, onChange, options) => (
  <select value={value} onChange={onChange} style={selectStyles}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

// Helper function to create a textarea
export const createTextarea = (value, onChange, placeholder, ref) => (
  <textarea
    ref={ref}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={textareaStyles}
  />
);

// Helper function to create a button
export const createButton = (onClick, children) => (
  <button onClick={onClick} style={buttonBaseStyles}>
    {children}
  </button>
);
