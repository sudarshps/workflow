import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFlow } from '../context/Context';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ isOpen, onClose }) {
  const [nodeLabel,setNodeLabel] = React.useState('')
  const [open, setOpen] = React.useState(false);
  const {contextMenu,setNodes,nodes} = useFlow() 

  const handleClose = () => {
    setOpen(false);
    onClose(false)
  }
  console.log('hi',nodes);
  
  React.useEffect(() => {
    if (isOpen) {
      setOpen(isOpen)
      setNodeLabel(contextMenu.label)
    }
  }, [isOpen])

  console.log('nid',contextMenu?.id)

  const handleSave = () => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === contextMenu?.id
          ? { 
              ...node, 
              data: { ...node.data, label: nodeLabel },
            }
          : node
      )
    );
  
    handleClose(); 
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Node
          </Typography>
          <div className='flex flex-col'>
            <label htmlFor="label">Label</label>
            <input type="text" className='border rounded' value={nodeLabel} onChange={(e)=>setNodeLabel(e.target.value)}/>
          </div>
          <div className='flex justify-end'>
            <button onClick={handleSave} className='bg-blue-500 rounded px-4 py-2 hover:cursor-pointer hover:bg-blue-600'>Save</button>

          </div>
        </Box>
      </Modal>
    </div>
  );
}
