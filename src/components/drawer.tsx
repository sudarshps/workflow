import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { ToastContainer, toast } from 'react-toastify';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import { ColorPicker } from 'primereact/colorpicker';
type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface DrawerProps {
  trigger: boolean;
  closeDrawer: (val: boolean) => void;
  nodeToBeRemoved: string;
}

export default function AnchorTemporaryDrawer({ trigger, closeDrawer, nodeToBeRemoved }: DrawerProps) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const [addNodeLabel, setAddNodeLabel] = React.useState('')
  const [color, setColor] = React.useState<string | undefined>(undefined)
  const [nodes, setNodes] = React.useState([{ id: "node-1", label: "Start", borderColor: '#3b82f6' },
  { id: "node-2", label: "Process", borderColor: '#10b981' },
  { id: "node-3", label: "Decision", borderColor: '#10b981' },])

  const setNewNode = () => {
    console.log('col',color);
    
    if (addNodeLabel.trim()) {
      const label = addNodeLabel as string
      const data = {
        id: `${nodes.length + 1}`,
        label,
        borderColor: `#${color}`
      }
      setNodes((prev) => [...prev, data])
      setAddNodeLabel('')
    } else {
      toast.error('Enter a label name!')
      return
    }
  }

  const deleteNode = (nodeId: string) => {
    setNodes((node) => node.filter((node) => node.id !== nodeId))
  }

  React.useEffect(() => {
    if (nodeToBeRemoved.trim()) {
      setNodes((node) => node.filter((node) => node.id !== nodeToBeRemoved))
    }
  }, [nodeToBeRemoved])

  React.useEffect(() => {
    if (trigger) {
      setState((prev) => ({ ...prev, right: true }));
    } else {
      setState((prev) => ({ ...prev, right: false }));
    }
  }, [trigger]);

  const handleClose = () => {
    closeDrawer(false)
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, nodeId: string, nodeLabel: string, borderColor: string) => {
    const nodeData = JSON.stringify({ nodeId, label: nodeLabel, borderColor })
    e.dataTransfer.setData("application/reactflow", nodeData)
    e.dataTransfer.effectAllowed = 'move'
  }

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    >
      <div className='absolute top-0 right-0 z-10'>
        <button
          className='bg-red-500 px-6 rounded-lg text-white hover:cursor-pointer'
          onClick={handleClose}
        >
          X
        </button>
      </div>

      <div className="w-full max-w-sm mt-3 space-y-3 shadow-md rounded-lg p-4 flex flex-col items-center gap-2">
        <label htmlFor="Node" className='font-semibold'>Add Node</label>
        <input
          type="text"
          placeholder="Label"
          className="border border-gray-300 rounded-md p-2 flex-1"
          value={addNodeLabel}
          onChange={(e) => setAddNodeLabel(e.target.value)}
        />
        <div className='flex items-center justify-center gap-4'>
          <p>Border Color:</p>
        <ColorPicker appendTo='self' value={color || '#000000'} onChange={(e) => setColor(e.value?.toString()||'#000000')} />

        </div>
        <button onClick={setNewNode} className="bg-blue-500 w-full max-w-sm hover:cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-md">Add</button>
      </div>

      <Divider />

      {nodes.length ? (<div className='w-full h-full max-w-sm mt-3 shadow-md rounded-lg p-4 flex flex-col items-center gap-2'>
        <label htmlFor="Node" className='font-semibold'>Node List</label>
        {
          nodes.map((node) => (
            <div className='flex w-full items-center justify-center space-x-2'>
              <div key={node.id} draggable onDragStart={(e) => handleDragStart(e, node.id, node.label, node.borderColor)} style={{ borderColor: `${node.borderColor}` }} className={`text-center p-2 border w-full rounded-md cursor-grab`}>
                {node.label}
              </div>
              <button onClick={() => deleteNode(node.id)}><DeleteIcon className='text-red-500 hover:cursor-pointer' /></button>
            </div>
          ))
        }
      </div>) : null}
    </Box>
  );

  return (
    <div>
      <ToastContainer autoClose={2000} />
      {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            variant='persistent'
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
