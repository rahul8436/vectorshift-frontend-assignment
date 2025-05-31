import React from 'react';
import NodeFactory from '../Factory/NodeFactory';


const NumberContent = ({ state, updateState }) => {
  return (
    <div>
      <input
        type='number'
        value={state.value}
        onChange={(e) => updateState('value')(Number(e.target.value))}
      />
    </div>
  );
};

export const NumberNode = NodeFactory.createNode({
  type: 'number',
  title: 'Number',
  inputs: [{ id: 'input' }],
  outputs: [{ id: 'value' }],
  defaultData: {
    value: 0,
  },
  renderContent: ({ state, updateState }) => (
    <NumberContent state={state} updateState={updateState} />
  ),
});