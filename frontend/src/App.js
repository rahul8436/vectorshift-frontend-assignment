import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';

function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ReactFlowProvider>
        <PipelineToolbar />
        <div style={{ flex: 1, position: 'relative' }}>
          <PipelineUI />
        </div>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <SubmitButton />
        </div>
      </ReactFlowProvider>
    </div>
  );
}

export default App;
