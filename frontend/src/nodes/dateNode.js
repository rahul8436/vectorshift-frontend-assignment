import NodeFactory from './NodeFactory';

// Create a proper React component for the date content
const DateContent = ({ state, updateState }) => {
  const formatDate = () => {
    const d = new Date(state.date);
    switch (state.format) {
      case 'ISO':
        return d.toISOString();
      case 'Locale':
        return d.toLocaleDateString();
      case 'US':
        return d.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      case 'EU':
        return d.toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      default:
        return d.toISOString();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label
          style={{
            fontSize: '12px',
            color: '#64748b',
            fontWeight: '500',
          }}
        >
          Date
        </label>
        <input
          type='date'
          value={state.date}
          onChange={(e) => updateState('date')(e.target.value)}
          style={{
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            backgroundColor: '#f8fafc',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
          }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label
          style={{
            fontSize: '12px',
            color: '#64748b',
            fontWeight: '500',
          }}
        >
          Format
        </label>
        <select
          value={state.format}
          onChange={(e) => updateState('format')(e.target.value)}
          style={{
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            backgroundColor: '#f8fafc',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <option value='ISO'>ISO</option>
          <option value='Locale'>Locale</option>
          <option value='US'>US Format</option>
          <option value='EU'>EU Format</option>
        </select>
      </div>
        <div
          style={{
          padding: '16px',
          backgroundColor: '#f1f5f9',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#334155',
          textAlign: 'center',
          border: '1px solid #e2e8f0',
            wordBreak: 'break-all',
          }}
        >
          {formatDate()}
        </div>
      </div>
  );
};

// Create the DateNode using NodeFactory
export const DateNode = NodeFactory.createNode({
  type: 'date',
  title: 'Date Formatter',
  inputs: [{ id: 'date' }],
  outputs: [{ id: 'formatted' }],
  defaultData: {
    date: new Date().toISOString().split('T')[0],
    format: 'ISO',
  },
  renderContent: ({ state, updateState }) => (
    <DateContent state={state} updateState={updateState} />
  ),
});
