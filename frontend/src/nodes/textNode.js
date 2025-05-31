// textNode.js

import NodeFactory from './NodeFactory';
import { useState, useEffect, useRef, useCallback } from 'react';


// Helper function to extract variables from text (now also available in NodeFactory)
const extractVariables = (text) => {
  const regex = /{{([a-zA-Z_$][a-zA-Z0-9_$]*)}}/g;
  const variables = new Set();
  let match;

  while ((match = regex.exec(text)) !== null) {
    variables.add(match[1]);
  }

  return Array.from(variables);
};

// Create a proper React component for the text content
const TextContent = ({ state, updateState, id }) => {
  const textareaRef = useRef(null);
  const [variables, setVariables] = useState([]);

  // Wrap updateState in useCallback to prevent unnecessary re-renders
  const updateVariables = useCallback(
    (newVariables) => {
      updateState('variables')(newVariables);
    },
    [updateState]
  );

  // Update variables when text changes
  useEffect(() => {
    const newVariables = extractVariables(state.text);
    setVariables(newVariables);
    updateVariables(newVariables);
  }, [state.text, updateVariables]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [state.text]);

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
        position: 'relative',
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
          Text Content
        </label>
        <textarea
          ref={textareaRef}
          value={state.text}
          onChange={(e) => updateState('text')(e.target.value)}
          placeholder='Enter text... Use {{variableName}} for variables'
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            backgroundColor: '#f8fafc',
            outline: 'none',
            boxSizing: 'border-box',
            resize: 'none',
            overflow: 'hidden',
            lineHeight: '1.5',
          }}
        />
      </div>
      {variables.length > 0 && (
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
            Variables
          </label>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '12px',
              backgroundColor: '#f1f5f9',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
            }}
          >
            {variables.map((variable) => (
              <div
                key={variable}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px',
                  backgroundColor: '#ffffff',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#14b8a6',
                  }}
                />
                <span
                  style={{
                    fontSize: '14px',
                    color: '#334155',
                    fontFamily: 'monospace',
                  }}
                >
                  {variable}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Create the TextNode using the enhanced NodeFactory
export const TextNode = NodeFactory.createNode({
  type: 'text',
  title: 'Text',
  defaultData: {
    text: '{{input}}',
    variables: ['input'],
  },
  // Dynamic inputs based on variables in the text
  inputs: NodeFactory.createVariableInputs({ textField: 'text' }),
  // Static output
  outputs: [{ id: 'output' }],
  // Render the text content
  renderContent: ({ state, updateState }) => (
    <TextContent state={state} updateState={updateState} />
  ),
  // Optional callback when state changes
  onStateChange: (state, id) => {
    // Could be used for additional logic, logging, etc.
    console.log(`TextNode ${id} state changed:`, state);
  },
});
