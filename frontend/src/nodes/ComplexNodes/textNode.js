// textNode.js

import React, { useState, useEffect, useRef, useCallback } from 'react';
import NodeFactory from '../Factory/NodeFactory';
import { useReactFlow } from 'reactflow';

// Helper function to extract variables from text
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
  const [showInputSelector, setShowInputSelector] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [availableInputs, setAvailableInputs] = useState([]);
  const { getNodes } = useReactFlow();

  // Get available inputs from the flow
  const getAvailableInputs = useCallback(() => {
    const nodes = getNodes();
    return nodes
      .filter((node) => node.type === 'customInput')
      .map((node) => ({
        id: node.data?.name || node.id,
        type: node.data?.type || 'text',
      }));
  }, [getNodes]);

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

    // Check for '{{' to show input selector
    const text = state.text;
    const position = textareaRef.current?.selectionStart;
    if (position !== undefined) {
      const lastTwoChars = text.slice(position - 2, position);
      if (lastTwoChars === '{{') {
        setSelectedPosition(position);
        setShowInputSelector(true);
        setAvailableInputs(getAvailableInputs());
      } else if (showInputSelector) {
        // If we're already showing the selector, filter based on what's being typed
        const currentText = text.slice(selectedPosition, position);
        const filteredInputs = getAvailableInputs().filter((input) =>
          input.id.toLowerCase().includes(currentText.toLowerCase())
        );
        setAvailableInputs(filteredInputs);
      }
    }
  }, [
    state.text,
    updateVariables,
    getAvailableInputs,
    showInputSelector,
    selectedPosition,
  ]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [state.text]);

  const handleInputSelection = (inputId) => {
    if (selectedPosition) {
      const newText =
        state.text.slice(0, selectedPosition) +
        `${inputId}}}` +
        state.text.slice(selectedPosition);
      updateState('text')(newText);
      setShowInputSelector(false);
      setSelectedPosition(null);
    }
  };

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
          placeholder='Type {{ to insert input variables...'
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

      {showInputSelector && availableInputs.length > 0 && (
        <div
          style={{
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
          }}
        >
          {availableInputs.map((input) => (
            <div
              key={input.id}
              onClick={() => handleInputSelection(input.id)}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                hover: {
                  backgroundColor: '#f1f5f9',
                },
              }}
            >
              {input.id} ({input.type})
            </div>
          ))}
        </div>
      )}

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

// Create the TextNode using NodeFactory
export const TextNode = NodeFactory.createNode({
  type: 'text',
  title: 'Text',
  defaultData: {
    text: '',
    variables: [],
  },
  inputs: NodeFactory.createVariableInputs({ textField: 'text' }),
  outputs: [{ id: 'output' }],
  renderContent: ({ state, updateState }) => (
    <TextContent state={state} updateState={updateState} />
  ),
  onStateChange: (state, id) => {
    console.log(`TextNode ${id} state changed:`, state);
  },
});
