// toolbar.js

import { DraggableNode } from './draggableNode';
import { useStore } from './store';

export const PipelineToolbar = () => {
  const clearAll = useStore((state) => state.clearAll);

  return (
    <div
      style={{
        padding: '12px 20px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        boxShadow:
          '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: '24px',
              color: '#1e293b',
              fontWeight: '700',
              letterSpacing: '-0.5px',
            }}
          >
            Pipeline Builder
          </h1>
          <span
            style={{
              padding: '4px 12px',
              backgroundColor: '#f1f5f9',
              borderRadius: '20px',
              fontSize: '14px',
              color: '#64748b',
              fontWeight: '500',
            }}
          >
            Drag & Drop Interface
          </span>
        </div>
        <button
          onClick={clearAll}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            height: '36px',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#dc2626';
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#ef4444';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
          }}
        >
          <span style={{ fontSize: '16px' }}>🗑️</span>
          Clear All
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
          padding: '12px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
        }}
      >
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text' label='Text' />
        <DraggableNode type='counter' label='Counter' />
        <DraggableNode type='math' label='Math' />
        <DraggableNode type='color' label='Color' />
        <DraggableNode type='date' label='Date' />
        <DraggableNode type='json' label='JSON' />
        <DraggableNode type='toggle' label='Toggle' />
        <DraggableNode type='number' label='Number' />
        <DraggableNode type='echo' label='Echo' />
        <DraggableNode type='select' label='Select' />
        <DraggableNode type='simpleText' label='Simple Text' />
        <DraggableNode type='simpleCounter' label='Simple Counter' />
      </div>
    </div>
  );
};
