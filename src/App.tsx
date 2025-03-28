import React, { useCallback, useEffect, useRef, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Drawer from './components/drawer'
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  addEdge,
  Node,
  Connection,
  BackgroundVariant,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import IconMenu from './components/menu';
import BasicModal from './components/modal';
import { useFlow } from './context/Context';
import BasicSpeedDial from './components/speedDial';

interface ContextMenuTypes extends Node {
  id: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    label: string;
  };
  style: {
    borderColor: string;
  };
}



export default function App() {
  const flowContext = useFlow();

  const nodes = flowContext?.nodes;
  const edges = flowContext?.edges;
  const setNodes = flowContext?.setNodes;
  const setEdges = flowContext?.setEdges;
  const onNodesChange = flowContext?.onNodesChange;
  const onEdgesChange = flowContext?.onEdgesChange;
  const contextMenu = flowContext?.contextMenu;
  const setContextMenu = flowContext?.setContextMenu;
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  const [isMenuopen, setisMenuOpen] = useState<boolean>(false)
  const [droppedNode, setDroppedNode] = useState('')
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)

  const contextMenuRef = useRef<HTMLDivElement | null>(null)

  const onConnect = useCallback(
    (params: Connection) => setEdges?.((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()

    const data = e.dataTransfer.getData('application/reactflow')
    const { nodeId, label, borderColor } = JSON.parse(data)
    if (!data) return
    if (nodes) {
      const newNode = {
        id
          : `${nodes.length + 1}`,
        position: {
          x: e.clientX - 100,
          y: e.clientY - 50
        },
        data: { label },
        style: { borderColor: `${borderColor}` }
      }
      setDroppedNode(nodeId)
      setNodes?.((prev:any) => [...prev, newNode])
    }
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as unknown as HTMLElement)) {
      setisMenuOpen(false)
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const onNodeContextMenu = (e: React.MouseEvent, node: ContextMenuTypes) => {
    e.preventDefault()
    const label = node.data.label as string
    const borderColor = node.style?.borderColor as string
    setContextMenu?.({
      id: node.id,
      label: label,
      borderColor: borderColor,
      x: e.clientX,
      y: e.clientY
    })
    setisMenuOpen(true)
  }

  const closeDrawer = (val: boolean) => {
    setIsDrawerOpen(val);
  };

  const handleDelete = () => {
    const nodeId = contextMenu?.id
    setNodes?.((node) => node.filter((node) => node.id !== nodeId))
    setContextMenu?.(null)
    setisMenuOpen(false)
  }

  const handleEdit = () => {
    setEditModalOpen(true)

  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onNodeContextMenu={onNodeContextMenu}
        onDrop={onDrop}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />

      </ReactFlow>
      {editModalOpen && (<BasicModal isOpen={editModalOpen} onClose={(val: boolean) => setEditModalOpen(val)} />)}
      {isMenuopen && (
        <div
          ref={contextMenuRef}
          style={{
            position: 'absolute',
            top: contextMenu?.y,
            left: contextMenu?.x,
            background: 'white',
            border: '1px solid #ccc',
            padding: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            zIndex: 1000,
          }}
        >
          <IconMenu onDelete={handleDelete} onEdit={handleEdit} />
        </div>
      )}
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
      <Drawer trigger={isDrawerOpen} closeDrawer={closeDrawer} nodeToBeRemoved={droppedNode} />
      <BasicSpeedDial />
    </div>
  );
}