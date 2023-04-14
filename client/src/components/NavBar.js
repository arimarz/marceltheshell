import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { NavLink } from "react-router-dom";
import UserContext from './UserContext';
import {useContext} from 'react';
import home from '../pictures/home_shell.png'
import {Avatar, Link} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;

function NavBar() {
    const userGrab = useContext(UserContext)
    const history = useHistory();
    if (!userGrab.user) {
        return (
        <Link
            component={NavLink}
            exact
            to="/login"
            activeStyle={{ color: '#d09aa4' }}
            underline="none"
            >
            Login
            </Link>
        );
    }
        const {username, avatar, id} = userGrab.user
    const handleLogout = () => {
            fetch('/logout', { method: 'DELETE' })
                .then(() => {
                    history.push('/login');
                })
                .catch(error => console.error('Error logging out:', error));
            };
            
    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor:'#7f7c5b'
            },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <List sx={{ '& .MuiListItem-root': { marginBottom: '60px' },
                    color: '#e66288' }}>
            <ListItem key='Home' disablePadding>
                <Link component={NavLink} exact to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton>
                    <ListItemIcon>
                        <Avatar src={home} sx={{width: '40px', height: '40px'}}/>
                    </ListItemIcon>
                    <ListItemText primary='Home' primaryTypographyProps={{ fontSize: '24px' }}/>
                    </ListItemButton>
                </Link>
                </ListItem>
                <ListItem key='Profile' disablePadding>
                <Link component={NavLink} exact to={`/profile/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton>
                    <ListItemIcon>
                        <Avatar src={avatar} sx={{width: '40px', height: '40px'}}/>
                    </ListItemIcon>
                    <ListItemText primary={username} primaryTypographyProps={{ fontSize: '24px' }}/>
                    </ListItemButton>
                </Link>
                </ListItem>
                <ListItem key='Create' disablePadding>
                <Link component={NavLink} exact to={`/post/create`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton>
                    <ListItemIcon>
                    <AddCircleOutlineIcon style={{ color: '#e66288'}} sx={{width: '40px', height: '40px'}}/>
                    </ListItemIcon>
                    <ListItemText primary='Create' primaryTypographyProps={{ fontSize: '24px' }}/>
                    </ListItemButton>
                </Link>
                </ListItem>
            <ListItem key='Logout' disablePadding>
            <Link component={NavLink} exact to={`/logout`} onClick={handleLogout} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemButton>
                    <ListItemIcon>
                    <LogoutIcon style={{ color: '#e66288'}} sx={{width: '40px', height: '40px'}}/>
                    </ListItemIcon>
                    <ListItemText primary='Logout' primaryTypographyProps={{ fontSize: '24px' }}/>
                </ListItemButton>
                </Link>
                </ListItem>
            </List>
        </Drawer>
            <Toolbar />
        </Box>
    );
}

export default NavBar;

