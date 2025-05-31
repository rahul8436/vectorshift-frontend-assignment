import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';

/**
 * BaseNode is a reusable component that provides a consistent structure and styling for all nodes in the pipeline.
 * It handles common functionality like input/output handles, delete operations, and styling.
 *
 * @component
 * @example
 * // Basic usage
 * <BaseNode
 *   id="my-node-1"
 *   data={{ someData: 'value' }}
 *   title="My Node"
 *   inputs={[{ id: 'input1' }]}
 *   outputs={[{ id: 'output1' }]}
 * >
 *   <div>Custom content here</div>
 * </BaseNode>
 *
 * @example
 * // With custom styling
 * <BaseNode
 *   id="my-node-2"
 *   data={{ someData: 'value' }}
 *   title="Styled Node"
 *   inputs={[{ id: 'input1' }]}
 *   outputs={[{ id: 'output1' }]}
 *   style={{ width: 300 }}
 *   className="custom-node"
 * >
 *   <div>Custom content here</div>
 * </BaseNode>
 *
 * @param {Object} props - Component props
 * @param {string} props.id - Unique identifier for the node
 * @param {Object} props.data - Node data object containing any custom data
 * @param {string} props.title - Display title for the node
 * @param {Array<{id: string}>} [props.inputs=[]] - Array of input handle configurations
 * @param {Array<{id: string}>} [props.outputs=[]] - Array of output handle configurations
 * @param {React.ReactNode} props.children - Custom content to be rendered inside the node
 * @param {Object} [props.style={}] - Additional styles to override default node styling
 * @param {string} [props.className=''] - Additional CSS classes for the node
 *
 * @returns {JSX.Element} A styled node component with handles and delete functionality
 */
export const BaseNode = ({
  id,
  data,
  title,
  inputs = [],
  outputs = [],
  children,
  style = {},
  className = '',
}) => {
  const onNodesChange = useStore((state) => state.onNodesChange);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /**
   * Handles the delete button click by showing the confirmation modal
   */
  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  /**
   * Confirms node deletion and removes it from the flow
   */
  const confirmDelete = () => {
    onNodesChange([{ type: 'remove', id }]);
    setShowDeleteModal(false);
  };

  /**
   * Returns the color associated with a node type
   * @param {string} type - The node type (e.g., 'customInput', 'llm', etc.)
   * @returns {string} The hex color code for the node type
   */
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
    };
    return colors[type] || '#64748b'; // Slate as default
  };

  const nodeType = id.split('-')[0];
  const nodeColor = getNodeColor(nodeType);

  /**
   * Base styles for the node container
   * @type {Object}
   */
  const baseStyle = {
    width: 240,
    minHeight: 100,
    border: '2px solid #e2e8f0',
    borderRadius: '16px',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    position: 'relative',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    ...style,
  };

  return (
    <>
      <div
        style={baseStyle}
        className={`base-node ${className}`}
        onMouseOver={(e) => {
          e.currentTarget.style.boxShadow = `0 10px 15px -3px ${nodeColor}20, 0 4px 6px -2px ${nodeColor}10`;
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.borderColor = nodeColor;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.boxShadow =
            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = '#e2e8f0';
        }}
      >
        <button
          onClick={handleDelete}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'none',
            border: 'none',
            color: '#ef4444',
            cursor: 'pointer',
            fontSize: '20px',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#fee2e2';
            e.target.style.transform = 'scale(1.1) rotate(90deg)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.transform = 'scale(1) rotate(0deg)';
          }}
        >
          ×
        </button>

        <div
          style={{
            borderBottom: '2px solid #f1f5f9',
            paddingBottom: '16px',
            marginBottom: '16px',
            fontWeight: '600',
            fontSize: '16px',
            color: '#1e293b',
            paddingRight: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: nodeColor,
              display: 'inline-block',
              boxShadow: `0 0 0 4px ${nodeColor}20`,
            }}
          />
          {title}
        </div>

        {children}

        {/* Input Handles */}
        {inputs.map((input, index) => (
          <Handle
            key={`input-${index}`}
            type='target'
            position={Position.Left}
            id={`${id}-input-${index}`}
            style={{
              top: `${((index + 1) * 100) / (inputs.length + 1)}%`,
              background: nodeColor,
              width: '14px',
              height: '14px',
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          />
        ))}

        {/* Output Handles */}
        {outputs.map((output, index) => (
          <Handle
            key={`output-${index}`}
            type='source'
            position={Position.Right}
            id={`${id}-output-${index}`}
            style={{
              top: `${((index + 1) * 100) / (outputs.length + 1)}%`,
              background: nodeColor,
              width: '14px',
              height: '14px',
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          />
        ))}
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        nodeTitle={title}
      />
    </>
  );
};
