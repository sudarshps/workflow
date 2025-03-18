import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFlow } from '../context/Context';
import { ColorPicker } from 'primereact/colorpicker';


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
  const [nodeLabel, setNodeLabel] = React.useState('')
  const [border,setBorder] = React.useState('')
  const [open, setOpen] = React.useState(false);
  // const [color, setColor] = React.useState<string | undefined>(undefined)

  const { contextMenu, setNodes, nodes } = useFlow()

  const handleClose = () => {
    setOpen(false);
    onClose(false)
  }

  React.useEffect(() => {
    if (isOpen) {
      setOpen(isOpen)
      setNodeLabel(contextMenu.label)
      const colorCode = contextMenu.borderColor.slice(1)      
      setBorder(colorCode)
    }
  }, [isOpen])

  const handleSave = () => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === contextMenu?.id
          ? {
            ...node,
            data: { ...node.data, label: nodeLabel },
            style:{...node.data,borderColor:`#${border}`}
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
          <div className='space-y-4'>
            <div className='flex flex-col'>
              <label htmlFor="label">Label:</label>
              <input type="text" className='border rounded' value={nodeLabel} onChange={(e) => setNodeLabel(e.target.value)} />
            </div>
            <div className='flex gap-4 items-center'>
              <label htmlFor="label">Background Color:</label>
              <ColorPicker appendTo='self' value={border} onChange={(e) => setBorder(e.value?.toString() || '#000000')} />

            </div>
          </div>

          <div className='flex justify-end p-4'>
            <button onClick={handleSave} className='text-white bg-blue-500 rounded px-4 py-2 hover:cursor-pointer hover:bg-blue-600'>Save</button>

          </div>
        </Box>
      </Modal>
    </div>
  );
}
