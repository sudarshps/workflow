import React, { useCallback, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Drawer from './components/drawer'
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes: any[] = [];
const initialEdges:any[] = [];



export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()

    const data = e.dataTransfer.getData('application/reactflow')
    const {label,borderColor} = JSON.parse(data)
    if (!data) return

    const newNode = {
      id: `${nodes.length + 1}`,
      position: {
        x: e.clientX - 100,
        y: e.clientY - 50
      },
      data: { label,borderColor }
    }

    setNodes((prev) => [...prev, newNode])
  }

  const closeDrawer = (val: boolean) => {
    setIsDrawerOpen(val);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />

      </ReactFlow>

      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "0px",
          transform: "translateY(-50%)",
          zIndex: 1000,
        }}
      >
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded-l-lg shadow-lg hover:bg-blue-600 transition-all duration-300 flex items-center hover:cursor-pointer"
          onClick={() => setIsDrawerOpen(true)}
        >
          <ArrowBackIosIcon fontSize="medium" />
        </button>
      </div>
      <Drawer trigger={isDrawerOpen} closeDrawer={closeDrawer} />
    </div>
  );
}