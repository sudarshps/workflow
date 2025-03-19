import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import { useFlow } from '../context/Context';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const actions = [
  { icon: <FileUploadIcon />, name: 'Load' },
  { icon: <SaveIcon />, name: 'Save' },
];

export default function BasicSpeedDial() {

    const{loadFromLocalStorage,saveToLocalStorage} = useFlow()
    const handleClick = (action:string) => {
        if(action === 'Load'){
            loadFromLocalStorage()
        }else{
            saveToLocalStorage()
        }
    }
  return (
    <Box sx={{position: 'absolute', bottom: 250, left:130,  transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', right: 16,zIndex:3000 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            onClick={()=>handleClick(action.name)}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
