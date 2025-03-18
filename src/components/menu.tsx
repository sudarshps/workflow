import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';


export default function IconMenu({ onDelete,onEdit }: { onDelete: () => void,onEdit: () => void }) {
    return (
        <Paper sx={{ width: 120, maxWidth: '100%' }}>
            <MenuList>
                <MenuItem onClick={()=>onEdit()}>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => onDelete()}>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </MenuList>
        </Paper>
    );
}
