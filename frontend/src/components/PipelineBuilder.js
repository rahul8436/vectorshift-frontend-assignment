import React, { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { TextNode } from '../nodes/TextNode';
import { NumberRangeNode } from '../nodes/NumberRangeNode';
import { NumberNode } from '../nodes/NumberNode';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

const nodeTypes = {
  text: TextNode,
  numberRange: NumberRangeNode,
  number: NumberNode,
};

export const PipelineBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [pipelineName, setPipelineName] = useState('');
  const [pipelineDescription, setPipelineDescription] = useState('');
  const [selectedNodeType, setSelectedNodeType] = useState('text');

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = () => {
    const newNode = {
      id: `${selectedNodeType}-${nodes.length + 1}`,
      type: selectedNodeType,
      position: { x: 100, y: 100 + nodes.length * 100 },
      data: { label: `${selectedNodeType} node` },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const clearPipeline = () => {
    setNodes([]);
    setEdges([]);
    setPipelineName('');
    setPipelineDescription('');
  };

  const savePipeline = () => {
    if (!pipelineName.trim()) {
      toast.error('Please enter a pipeline name');
      return;
    }

    const pipeline = {
      name: pipelineName,
      description: pipelineDescription,
      nodes,
      edges,
    };

    console.log('Saving pipeline:', pipeline);
    toast.success('Pipeline saved successfully!');
  };

  return (
    <div className='flex flex-col h-screen bg-gray-50'>
      {/* Top Section */}
      <div className='flex-none p-4 border-b bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center justify-between gap-4'>
            <div className='flex-1 space-y-4'>
              <div>
                <Label htmlFor='pipelineName'>Pipeline Name</Label>
                <Input
                  id='pipelineName'
                  value={pipelineName}
                  onChange={(e) => setPipelineName(e.target.value)}
                  placeholder='Enter pipeline name'
                  className='mt-1'
                />
              </div>
              <div>
                <Label htmlFor='pipelineDescription'>Description</Label>
                <Textarea
                  id='pipelineDescription'
                  value={pipelineDescription}
                  onChange={(e) => setPipelineDescription(e.target.value)}
                  placeholder='Enter pipeline description'
                  className='mt-1'
                />
              </div>
            </div>
            <div className='flex items-end gap-2'>
              <Button variant='outline' onClick={clearPipeline}>
                Clear All
              </Button>
              <Button onClick={savePipeline}>Save Pipeline</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex'>
        {/* Node Controls */}
        <div className='w-64 p-4 border-r bg-white'>
          <div className='space-y-4'>
            <div>
              <Label>Node Type</Label>
              <Select
                value={selectedNodeType}
                onValueChange={setSelectedNodeType}
              >
                <SelectTrigger className='mt-1'>
                  <SelectValue placeholder='Select node type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='text'>Text</SelectItem>
                  <SelectItem value='numberRange'>Number Range</SelectItem>
                  <SelectItem value='number'>Number</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addNode} className='w-full'>
              Add Node
            </Button>
          </div>
        </div>

        {/* Flow Canvas */}
        <div className='flex-1'>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};
