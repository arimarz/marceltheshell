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
import home2 from '../pictures/homeButton.png'
import {Avatar, Link} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory, useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';

const drawerWidth = 270;

function NavBar() {
    const userGrab = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    if (!userGrab.user || location.pathname === '/login') {
        return null
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
                        backgroundColor:'#ceb9c4',
                        boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <List sx={{ '& .MuiListItem-root': { marginBottom: '150px' },
                        color: '#522f1a' }}>
                    <ListItem key='Home' disablePadding>
                        <Link component={NavLink} exact to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton>
                                <ListItemIcon sx={{ paddingRight: '16px' }}>
                                    <Avatar src={home2} sx={{width: '70px', height: '70px'}}/>
                                </ListItemIcon>
                                <ListItemText primary='Home' primaryTypographyProps={{ fontSize: '60px' }}/>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem key='Profile' disablePadding>
                        <Link component={NavLink} exact to={`/profile/${id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton>
                                <ListItemIcon sx={{ paddingRight: '16px' }}>
                                    <Avatar src={avatar} sx={{width: '70px', height: '70px', borderRadius: '50%',
                                        border: '3px solid #522f1a'}} />
                                </ListItemIcon>
                                <ListItemText primary={username} primaryTypographyProps={{ fontSize: '50px' }}/>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem key='Logout' disablePadding>
                    <Link component={NavLink} exact to={`/logout`} onClick={handleLogout} sx={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <LogoutIcon style={{ color: '#522f1a'}} sx={{width: '70px', height: '70px'}}/>
                                </ListItemIcon>
                                <ListItemText primary='Logout' sx={{ fontFamily: 'Kinder', fontWeight: 'bold' }} primaryTypographyProps={{ fontSize: '60px' }}/>
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

