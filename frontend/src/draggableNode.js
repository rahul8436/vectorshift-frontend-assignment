// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  const getNodeColor = (type) => {
    const colors = {
      customInput: '#6366f1', // Indigo
      llm: '#8b5cf6', // Purple
      customOutput: '#ec4899', // Pink
      text: '#14b8a6', // Teal
      counter: '#f59e0b', // Amber
      math: '#ef4444', // Red
      color: '#10b981', // Emerald
      date: '#3b82f6', // Blue
      json: '#f97316', // Orange
      numberRange: '#06b6d4', // Cyan
    };
    return colors[type] || '#64748b'; // Slate as default
  };

  const getNodeIcon = (type) => {
    const icons = {
      customInput: '📥',
      llm: '🤖',
      customOutput: '📤',
      text: '📝',
      counter: '🔢',
      math: '➕',
      color: '🎨',
      date: '📅',
      json: '📋',
      numberRange: '📊',
      echo: '🔊',
      select: '🔄',
      simpleText: '📝',
      number: '🔢',
      toggle: '🔄',
      simpleCounter: '🔢',
    };
    return icons[type] || '📦';
  };

  const nodeColor = getNodeColor(type);

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        minWidth: '100px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        border: '2px solid #e2e8f0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: '0 12px',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseOver={(e) => {
        e.target.style.boxShadow = `0 4px 8px -2px ${nodeColor}20`;
        e.target.style.transform = 'translateY(-1px)';
        e.target.style.borderColor = nodeColor;
        e.target.style.backgroundColor = `${nodeColor}08`;
      }}
      onMouseOut={(e) => {
        e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        e.target.style.transform = 'translateY(0)';
        e.target.style.borderColor = '#e2e8f0';
        e.target.style.backgroundColor = '#ffffff';
      }}
      draggable
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: nodeColor,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
        onMouseOver={(e) => {
          e.target.style.opacity = 1;
        }}
        onMouseOut={(e) => {
          e.target.style.opacity = 0;
        }}
      />
      <span
        style={{
          color: '#1e293b',
          fontSize: '13px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          letterSpacing: '0.3px',
        }}
      >
        <span style={{ fontSize: '16px' }}>{getNodeIcon(type)}</span>
        {label}
      </span>
    </div>
  );
};
