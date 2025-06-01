// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/ComplexNodes/inputNode';
import { LLMNode } from './nodes/ComplexNodes/llmNode';
import { OutputNode } from './nodes/ComplexNodes/outputNode';
import { TextNode } from './nodes/ComplexNodes/textNode';
import { CounterNode } from './nodes/ComplexNodes/counterNode';
import { MathNode } from './nodes/ComplexNodes/mathNode';
import { ColorNode } from './nodes/ComplexNodes/colorNode';
import { DateNode } from './nodes/ComplexNodes/dateNode';
import { JsonNode } from './nodes/ComplexNodes/jsonNode';
import { ToggleNode } from './nodes/SimpleNodes/toggleNode';
import { NumberNode } from './nodes/SimpleNodes/numberNode';
import { EchoNode } from './nodes/SimpleNodes/echoNode';
import { SimpleTextNode } from './nodes/SimpleNodes/simpleTextNode';
import { SelectNode } from './nodes/SimpleNodes/selectNode';
import { simpleCounterNode } from './nodes/SimpleNodes/simpleCounterNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  counter: CounterNode,
  math: MathNode,
  color: ColorNode,
  date: DateNode,
  json: JsonNode,
  toggle: ToggleNode,
  number: NumberNode,
  echo: EchoNode,
  simpleText: SimpleTextNode,
  select: SelectNode,
  simpleCounter: simpleCounterNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(
          event.dataTransfer.getData('application/reactflow')
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <>
      <div ref={reactFlowWrapper} style={{ width: '100wv', height: '70vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType='smoothstep'
        >
          <Background color='#aaa' gap={gridSize} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </>
  );
};
