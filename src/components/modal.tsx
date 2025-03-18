import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

export default function BasicModal({ node, isOpen, onClose }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose(false)
  }
  console.log('hi',node);
  
  React.useEffect(() => {
    if (isOpen) {
      setOpen(isOpen)
    }
  }, [isOpen])

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
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
            <input type="text" className='border rounded' />
          </div>
          <div className='flex justify-end'>
            <button className='bg-blue-500 rounded px-4 py-2 hover:cursor-pointer hover:bg-blue-600'>Save</button>

          </div>
        </Box>
      </Modal>
    </div>
  );
}
