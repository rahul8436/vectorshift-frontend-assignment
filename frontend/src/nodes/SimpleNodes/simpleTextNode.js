import React from 'react';
import NodeFactory from '../Factory/NodeFactory';


const SimpleTextContent = ({ state, updateState }) => {
  return (
    <div>
      <input
        type='text'
        value={state.value}
        onChange={(e) => updateState('value')(e.target.value)}
        placeholder='Enter text...'
      />
    </div>
  );
};

export const SimpleTextNode = NodeFactory.createNode({
  type: 'text',
  title: 'Text',
  inputs: [{ id: 'input' }],
  outputs: [{ id: 'value' }],
  defaultData: {
    value: '',
  },
  renderContent: ({ state, updateState }) => (
    <SimpleTextContent state={state} updateState={updateState} />
  ),
});