// submit.js

import { useState } from 'react';
import { useReactFlow } from 'reactflow';
import { ResultsModal } from './components/ResultsModal';

export const SubmitButton = () => {
  const { getNodes, getEdges } = useReactFlow();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    const nodes = getNodes();
    const edges = getEdges();

    const pipeline = {
      nodes,
      edges,
    };

    try {
      setError(null);
      const formData = new FormData();
      formData.append('pipeline', JSON.stringify(pipeline));

      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResults(data);
        setIsModalOpen(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <button
        onClick={handleSubmit}
        style={{
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease-in-out',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
      >
        Submit Pipeline
      </button>

      {error && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px',
            backgroundColor: '#ffebee',
            color: '#c62828',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: 1000,
            maxWidth: '400px',
          }}
        >
          <strong>Error:</strong> {error}
          <button
            onClick={() => setError(null)}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'none',
              border: 'none',
              color: '#c62828',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            ×
          </button>
        </div>
      )}

      <ResultsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        results={results}
      />
    </>
  );
};
