// llmNode.js

import NodeFactory from './NodeFactory';

// Create a proper React component for the LLM content
const LLMContent = ({ state, updateState }) => {
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
          Model
        </label>
        <select
          value={state.model}
          onChange={(e) => updateState('model')(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            backgroundColor: '#f8fafc',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            outline: 'none',
            boxSizing: 'border-box',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            backgroundSize: '16px',
            paddingRight: '36px',
          }}
        >
          <option value='gpt-3.5-turbo'>GPT-3.5 Turbo</option>
          <option value='gpt-4'>GPT-4</option>
          <option value='claude-2'>Claude 2</option>
        </select>
      </div>
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
          Temperature
        </label>
        <input
          type='range'
          min='0'
          max='1'
          step='0.1'
          value={state.temperature}
          onChange={(e) => updateState('temperature')(Number(e.target.value))}
          style={{
            width: '100%',
            height: '6px',
            padding: '0',
            border: 'none',
            outline: 'none',
            boxSizing: 'border-box',
            WebkitAppearance: 'none',
            appearance: 'none',
            background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${
              state.temperature * 100
            }%, #e2e8f0 ${state.temperature * 100}%, #e2e8f0 100%)`,
            borderRadius: '3px',
            cursor: 'pointer',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: '#64748b',
            marginTop: '4px',
          }}
        >
          <span>0</span>
          <span
            style={{
              backgroundColor: '#14b8a6',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: '500',
            }}
          >
            {state.temperature}
          </span>
          <span>1</span>
        </div>
      </div>
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
          System Prompt
        </label>
        <textarea
          value={state.systemPrompt}
          onChange={(e) => updateState('systemPrompt')(e.target.value)}
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            lineHeight: '1.6',
            backgroundColor: '#f8fafc',
            resize: 'vertical',
            transition: 'all 0.2s ease-in-out',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          placeholder='Enter system prompt...'
        />
      </div>
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
          User Prompt
        </label>
        <textarea
          value={state.userPrompt}
          onChange={(e) => updateState('userPrompt')(e.target.value)}
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            lineHeight: '1.6',
            backgroundColor: '#f8fafc',
            resize: 'vertical',
            transition: 'all 0.2s ease-in-out',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          placeholder='Enter user prompt...'
        />
      </div>
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
          Output
        </label>
        <div
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#f1f5f9',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#334155',
            textAlign: 'left',
            border: '1px solid #e2e8f0',
            wordBreak: 'break-all',
            boxSizing: 'border-box',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {state.output || 'No output yet'}
        </div>
      </div>
    </div>
  );
};

// Create the LLMNode using NodeFactory
export const LLMNode = NodeFactory.createNode({
  type: 'llm',
  title: 'LLM',
  inputs: [{ id: 'userPrompt' }],
  outputs: [{ id: 'output' }],
  defaultData: {
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    systemPrompt: '',
    userPrompt: '',
    output: '',
  },
  renderContent: ({ state, updateState }) => (
    <LLMContent state={state} updateState={updateState} />
  ),
});
