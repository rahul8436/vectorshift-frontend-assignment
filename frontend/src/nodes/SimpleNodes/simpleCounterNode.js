// counterNode.js

import React from 'react';
import NodeFactory from '../Factory/NodeFactory';
import {
  nodeContainerStyles,
  createField,
  createTextInput,
  createButton,
  counterContainerStyles,
  counterValueStyles,
} from '../Factory/NodeStyles';

// Create a proper React component for the counter content
const CounterContent = ({ state, updateState }) => {
  return (
    <div style={nodeContainerStyles}>
      {createField(
        'Counter Name',
        createTextInput(
          state.name,
          (e) => updateState('name')(e.target.value),
          'Enter counter name...'
        )
      )}

      {createField(
        'Current Value',
        <div style={counterContainerStyles}>
          {createButton(() => updateState('value')(state.value - 1), '-')}
          <span style={counterValueStyles}>{state.value}</span>
          {createButton(() => updateState('value')(state.value + 1), '+')}
        </div>
      )}

      {createField(
        'Step Size',
        createTextInput(
          state.step,
          (e) => updateState('step')(Number(e.target.value) || 1),
          'Enter step size...'
        )
      )}
    </div>
  );
};

// Create the CounterNode using NodeFactory
export const simpleCounterNode = NodeFactory.createNode({
  type: 'counter',
  title: 'Counter',
  inputs: [{ id: 'input' }],
  outputs: [{ id: 'value' }],
  defaultData: {
    name: 'Counter',
    value: 0,
    step: 1,
  },
  renderContent: ({ state, updateState }) => (
    <CounterContent state={state} updateState={updateState} />
  ),
});
