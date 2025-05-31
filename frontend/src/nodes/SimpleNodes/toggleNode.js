import React from 'react';
import NodeFactory from '../Factory/NodeFactory';


const ToggleContent = ({ state, updateState }) => {
  return (
    <div>
      <button onClick={() => updateState('value')(!state.value)}>
        {state.value ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};

export const ToggleNode = NodeFactory.createNode({
  type: 'toggle',
  title: 'Toggle',
  inputs: [{ id: 'input' }],
  outputs: [{ id: 'value' }],
  defaultData: {
    value: false,
  },
  renderContent: ({ state, updateState }) => (
    <ToggleContent state={state} updateState={updateState} />
  ),
});
