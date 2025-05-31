import React from 'react';
import NodeFactory from '../Factory/NodeFactory';


const EchoContent = ({ state, updateState }) => {
  return (
    <div>
      <input
        value={state.input}
        onChange={(e) => updateState('input')(e.target.value)}
        placeholder='Type something...'
      />
      <div>Output: {state.input}</div>
    </div>
  );
};

export const EchoNode = NodeFactory.createNode({
  type: 'echo',
  title: 'Echo',
  inputs: [{ id: 'input' }],
  outputs: [{ id: 'output' }],
  defaultData: {
    input: '',
  },
  renderContent: ({ state, updateState }) => (
    <EchoContent state={state} updateState={updateState} />
  ),
});