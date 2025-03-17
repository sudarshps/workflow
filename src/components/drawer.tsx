import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface DrawerProps {
  trigger: boolean;
  closeDrawer: (val: boolean) => void;
}

export default function AnchorTemporaryDrawer({ trigger, closeDrawer }: DrawerProps) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [nodes, setNodes] = React.useState([{ id: "node-1", label: "Start", borderColor:'border-indigo-500' },
  { id: "node-2", label: "Process", borderColor:'border-yellow-500' },
  { id: "node-3", label: "Decision", borderColor:'border-green-500' },])



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

  const handleDragStart = (e:React.DragEvent<HTMLDivElement>,nodeLabel:string,borderColor:string) => {
    const nodeData = JSON.stringify({label:nodeLabel,borderColor})
      e.dataTransfer.setData("application/reactflow",nodeData)
      e.dataTransfer.effectAllowed = 'move'
  }

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className='absolute top-0 right-0 z-10'>
        <button
          className='bg-red-500 px-6 rounded-lg text-white hover:cursor-pointer'
          onClick={handleClose}
        >
          X
        </button>
      </div>

      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}

      <div className="w-full max-w-sm mt-3 space-y-3 shadow-md rounded-lg p-4 flex flex-col items-center gap-2">
        <label htmlFor="Node" className='font-semibold'>Add Node</label>
        <input
          type="text"
          placeholder="Label"
          className="border border-gray-300 rounded-md p-2 flex-1"
        />
        <button className="bg-blue-500 w-full max-w-sm hover:cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-md">Add</button>
      </div>

      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
      <div className='w-full h-full max-w-sm mt-3 shadow-md rounded-lg p-4 flex flex-col items-center gap-2'>
        <label htmlFor="Node" className='font-semibold'>Node List</label>
          {
            nodes.map((node)=>(
              <div key={node.id} draggable onDragStart={(e)=>handleDragStart(e,node.label,node.borderColor)} className={`p-2 border ${node.borderColor} w-full text-center rounded-md cursor-grab`}>
                {node.label}
              </div>
            ))
          }
      </div>
    </Box>
  );

  return (
    <div>
      {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            disablePortal={true}
            variant='persistent'
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
