// inputNode.js

import React from 'react';
import NodeFactory from '../Factory/NodeFactory';
import {
  nodeContainerStyles,
  createField,
  createTextInput,
  createSelect,
  inputBaseStyles,
} from '../Factory/NodeStyles';

// Create a proper React component for the input content
const InputContent = ({ state, updateState }) => {
  return (
    <div style={nodeContainerStyles}>
      {createField(
        'Input Name',
        createTextInput(
          state.name,
          (e) => updateState('name')(e.target.value),
          'Enter input name...'
        )
      )}

      {createField(
        'Input Type',
        createSelect(state.type, (e) => updateState('type')(e.target.value), [
          { value: 'text', label: 'Text' },
          { value: 'file', label: 'File' },
        ])
      )}

      {state.type === 'text' &&
        createField(
          'Default Value',
          createTextInput(
            state.defaultValue,
            (e) => updateState('defaultValue')(e.target.value),
            'Enter default value...'
          )
        )}

      {state.type === 'file' &&
        createField(
          'File Input',
          <input
            type='file'
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                updateState('defaultValue')(file.name);
              }
            }}
            style={inputBaseStyles}
          />
        )}
    </div>
  );
};

// Keep track of input count
let inputCount = 0;

// Create the InputNode using NodeFactory
export const InputNode = NodeFactory.createNode({
  type: 'input',
  title: 'Input',
  inputs: [],
  outputs: [{ id: 'output' }],
  defaultData: {
    name: `input${inputCount++}`,
    type: 'text',
    defaultValue: '',
  },
  renderContent: ({ state, updateState }) => (
    <InputContent state={state} updateState={updateState} />
  ),
});
