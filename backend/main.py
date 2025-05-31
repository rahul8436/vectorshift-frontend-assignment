from fastapi import FastAPI, Form
from typing import Dict, List, Any
import json
from collections import defaultdict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL but can do * for all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    # Create adjacency list
    graph = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Build graph
    for edge in edges:
        source = edge['source']
        target = edge['target']
        graph[source].append(target)
        in_degree[target] += 1
    
    # Find nodes with no incoming edges
    queue = [node['id'] for node in nodes if in_degree[node['id']] == 0]
    
    # Process nodes
    processed = 0
    while queue:
        node = queue.pop(0)
        processed += 1
        
        # Reduce in-degree for neighbors
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we processed all nodes, it's a DAG
    return processed == len(nodes)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: str = Form(...)):
    try:
        data = json.loads(pipeline)
        nodes = data.get('nodes', [])
        edges = data.get('edges', [])
        
        return {
            'num_nodes': len(nodes),
            'num_edges': len(edges),
            'is_dag': is_dag(nodes, edges)
        }
    except json.JSONDecodeError:
        return {'error': 'Invalid JSON format'}
    except Exception as e:
        return {'error': str(e)}
