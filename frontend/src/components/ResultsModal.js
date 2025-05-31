import React from 'react';

export const ResultsModal = ({ isOpen, onClose, results }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px',
          width: '90%',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#666',
          }}
        >
          ×
        </button>

        <h2
          style={{
            margin: '0 0 20px 0',
            color: '#333',
            fontSize: '24px',
          }}
        >
          Pipeline Analysis Results
        </h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              padding: '16px',
              backgroundColor: '#f5f5f5',
              borderRadius: '6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>Number of Nodes:</span>
            <span style={{ fontSize: '18px' }}>{results.num_nodes}</span>
          </div>

          <div
            style={{
              padding: '16px',
              backgroundColor: '#f5f5f5',
              borderRadius: '6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>Number of Edges:</span>
            <span style={{ fontSize: '18px' }}>{results.num_edges}</span>
          </div>

          <div
            style={{
              padding: '16px',
              backgroundColor: results.is_dag ? '#e8f5e9' : '#ffebee',
              borderRadius: '6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>Is DAG:</span>
            <span
              style={{
                fontSize: '18px',
                color: results.is_dag ? '#2e7d32' : '#c62828',
              }}
            >
              {results.is_dag ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
