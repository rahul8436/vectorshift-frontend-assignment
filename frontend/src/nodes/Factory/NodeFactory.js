// NodeFactory.js
import { useState, useEffect } from 'react';
import { BaseNode } from '../BaseNode';

/**
 * NodeFactory provides a higher-level abstraction for creating nodes
 * with common functionality and patterns, supporting both static and dynamic inputs/outputs.
 */
class NodeFactory {
  /**
   * Creates a new node with the specified configuration
   * @param {Object} config - Node configuration
   * @param {string} config.type - Node type identifier
   * @param {string} config.title - Node display title
   * @param {Array|Function} config.inputs - Array of input handle configurations or function that returns inputs based on state
   * @param {Array|Function} config.outputs - Array of output handle configurations or function that returns outputs based on state
   * @param {Object} config.defaultData - Default data for the node
   * @param {Function} config.renderContent - Function to render node content
   * @param {Function} [config.onStateChange] - Optional callback when state changes
   * @returns {Function} React component for the node
   */
  static createNode(config) {
    const {
      type,
      title,
      inputs = [],
      outputs = [],
      defaultData = {},
      renderContent,
      onStateChange,
    } = config;

    // Create a proper React component
    const NodeComponent = ({ id, data }) => {
      // Initialize state from data or defaults
      const [state, setState] = useState(() => {
        const initialState = {};
        Object.keys(defaultData).forEach((key) => {
          initialState[key] = data?.[key] ?? defaultData[key];
        });
        return initialState;
      });

      // Determine if inputs/outputs are dynamic (functions) or static (arrays)
      const isDynamicInputs = typeof inputs === 'function';
      const isDynamicOutputs = typeof outputs === 'function';

      // Calculate current inputs and outputs
      const currentInputs = isDynamicInputs ? inputs(state) : inputs;
      const currentOutputs = isDynamicOutputs ? outputs(state) : outputs;

      // Update node data when state changes
      useEffect(() => {
        if (data) {
          Object.keys(state).forEach((key) => {
            data[key] = state[key];
          });
        }

        // Call optional state change callback
        if (onStateChange) {
          onStateChange(state, id);
        }
      }, [state, data, id]);

      // Create update handler for a specific field
      const createUpdateHandler = (field) => (value) => {
        setState((prev) => ({ ...prev, [field]: value }));
      };

      return (
        <BaseNode
          id={id}
          data={data}
          title={title}
          inputs={currentInputs}
          outputs={currentOutputs}
        >
          {renderContent({
            state,
            updateState: createUpdateHandler,
            id,
            inputs: currentInputs,
            outputs: currentOutputs,
          })}
        </BaseNode>
      );
    };

    // Set display name for debugging
    NodeComponent.displayName = `${type}Node`;

    return NodeComponent;
  }

  /**
   * Creates a text input field with common styling
   * @param {Object} props - Text input props
   * @returns {JSX.Element} Styled text input
   */
  static createTextInput({ value, onChange, placeholder, label, style = {} }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {label && (
          <label
            style={{
              fontSize: '12px',
              color: '#64748b',
              fontWeight: '500',
            }}
          >
            {label}
          </label>
        )}
        <input
          type='text'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            fontSize: '13px',
            backgroundColor: '#f8fafc',
            transition: 'all 0.2s ease-in-out',
            ...style,
          }}
        />
      </div>
    );
  }

  /**
   * Creates a textarea with common styling
   * @param {Object} props - Textarea props
   * @returns {JSX.Element} Styled textarea
   */
  static createTextArea({ value, onChange, placeholder, label, style = {} }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {label && (
          <label
            style={{
              fontSize: '12px',
              color: '#64748b',
              fontWeight: '500',
            }}
          >
            {label}
          </label>
        )}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            minHeight: '60px',
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            fontSize: '13px',
            backgroundColor: '#f8fafc',
            resize: 'none',
            transition: 'all 0.2s ease-in-out',
            ...style,
          }}
        />
      </div>
    );
  }

  /**
   * Creates a select dropdown with common styling
   * @param {Object} props - Select props
   * @returns {JSX.Element} Styled select
   */
  static createSelect({ value, onChange, options, label, style = {} }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {label && (
          <label
            style={{
              fontSize: '12px',
              color: '#64748b',
              fontWeight: '500',
            }}
          >
            {label}
          </label>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            fontSize: '13px',
            backgroundColor: '#f8fafc',
            transition: 'all 0.2s ease-in-out',
            ...style,
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  /**
   * Helper function to create dynamic inputs based on variables in text
   * @param {string} text - Text to extract variables from
   * @param {RegExp} [regex] - Custom regex pattern for variable extraction
   * @returns {Array} Array of input configurations
   */
  static extractVariableInputs(
    text,
    regex = /{{([a-zA-Z_$][a-zA-Z0-9_$]*)}}/g
  ) {
    const variables = new Set();
    let match;

    while ((match = regex.exec(text)) !== null) {
      variables.add(match[1]);
    }

    return Array.from(variables).map((variable) => ({ id: variable }));
  }

  /**
   * Common helper to create nodes with variable-based dynamic inputs
   * @param {Object} config - Configuration object
   * @param {string} config.textField - Field name that contains the text with variables
   * @param {RegExp} [config.variableRegex] - Custom regex for variable extraction
   * @returns {Function} Function that generates dynamic inputs based on text content
   */
  static createVariableInputs(config) {
    const { textField = 'text', variableRegex } = config;

    return (state) => {
      const text = state[textField] || '';
      return NodeFactory.extractVariableInputs(text, variableRegex);
    };
  }
}

export default NodeFactory;
