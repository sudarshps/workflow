import React, { useEffect,createContext, useContext, useState } from 'react'
import { useNodesState, useEdgesState, Node, Edge } from '@xyflow/react'


interface ContextMenuTypes extends Node {
    id: string;
    label: string;
    borderColor: string;
    x: number;
    y: number
}


interface ContextType {
    nodes: Node[];
    setNodes: React.Dispatch<React.SetStateAction<ContextMenuTypes[]>>
    onNodesChange: (changes: any) => void
    edges: Edge[]
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
    onEdgesChange: (changes: any) => void
    contextMenu: ContextMenuTypes | null
    setContextMenu: React.Dispatch<React.SetStateAction<{ id: string; label: string; borderColor: string; x: number; y: number } | null>>
}

const Context = createContext<ContextType | undefined>(undefined)


export const useFlow = () => {
    return useContext(Context)
}


export const Provider = ({ children }) => {
    const initialNodes: ContextMenuTypes[] = JSON.parse(sessionStorage.getItem('nodes') || '[]')
    const initialEdges: Edge[] = JSON.parse(sessionStorage.getItem('edges') || '[]')


    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
    const [contextMenu, setContextMenu] = useState(null)

    useEffect(() => {
        sessionStorage.setItem('nodes', JSON.stringify(nodes))
    }, [nodes])
    
    useEffect(() => {
        sessionStorage.setItem('edges', JSON.stringify(edges))
    }, [edges])
    


    return (
        <Context.Provider value={{ nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, contextMenu, setContextMenu }}>
            {children}
        </Context.Provider>
    )
}