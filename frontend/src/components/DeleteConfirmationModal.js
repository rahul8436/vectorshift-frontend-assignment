import React from 'react';

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  nodeTitle,
}) => {
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
          maxWidth: '400px',
          width: '90%',
        }}
      >
        <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>Delete Node</h3>
        <p style={{ margin: '0 0 24px 0', color: '#666' }}>
          Are you sure you want to delete this {nodeTitle} node? This action
          cannot be undone.
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f5f5f5',
              color: '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
