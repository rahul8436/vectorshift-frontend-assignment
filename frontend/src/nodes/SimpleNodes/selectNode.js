import React from 'react';
import NodeFactory from '../Factory/NodeFactory';


const SelectContent = ({ state, updateState }) => {
  return (
    <div>
      <select
        value={state.value}
        onChange={(e) => updateState('value')(e.target.value)}
      >
        <option value='A'>Option A</option>
        <option value='B'>Option B</option>
        <option value='C'>Option C</option>
      </select>
    </div>
  );
};

export const SelectNode = NodeFactory.createNode({
  type: 'select',
  title: 'Select',
  inputs: [{ id: 'input' }],
  outputs: [{ id: 'value' }],
  defaultData: {
    value: 'A',
  },
  renderContent: ({ state, updateState }) => (
    <SelectContent state={state} updateState={updateState} />
  ),
});