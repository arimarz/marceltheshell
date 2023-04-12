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

const drawerWidth = 240;

function NavBar() {
    const userGrab = useContext(UserContext)
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
                <Link component={NavLink} exact to={`/post`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton>
                    <ListItemIcon>
                    <AddCircleOutlineIcon style={{ color: '#e66288'}} sx={{width: '40px', height: '40px'}}/>
                    </ListItemIcon>
                    <ListItemText primary='Create' primaryTypographyProps={{ fontSize: '24px' }}/>
                    </ListItemButton>
                </Link>
                </ListItem>
            <ListItem key='Logout' disablePadding>
            <Link component={NavLink} exact to={`/logout`} style={{ textDecoration: 'none', color: 'inherit' }}>
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

// import { Box, Stack, Text, Icon, Link, VStack, Img} from "@chakra-ui/react";
// import { NavLink } from "react-router-dom";
// import UserContext from './UserContext';
// import {useContext} from 'react';
// import home from '../pictures/home_shell.png'
// import {Avatar} from '@mui/material'

// function NavBar() {
//     const userGrab = useContext(UserContext)
//     const imageStyle = {
//         ':hover':{

//         }
//     }
//     console.log(userGrab.user)
//     if (!userGrab.user) return <Link as={NavLink} exact to={`/login`} activeStyle={{ color: "#d09aa4" }}>
//     Login
//     </Link>
//     const {username, avatar} = userGrab.user
//     return (
//         <Box
//         bg="#7f7c5b"
//         w="260px"
//         minH="100vh"
//         borderRight="1px solid #dbdbdb"
//         position="fixed"
//         display="flex"
//         flexDirection="column"
//         justifyContent="center"
//         spacing = '20px'
//         >
//         <Stack spacing='20px' p={6}>
//             <VStack spacing={5} align="stretch">
//             <Link as={NavLink} exact to="/" activeStyle={{ color: "#e66288" }}>
//                 <Avatar src={home} />
//                 Home
//                 </Link>
//             <Text fontWeight="bold" fontSize="18px" color='#d09aa4' >
//             {username}
//             </Text>
//             <Box>
//             <Link
//                 as={NavLink}
//                 exact
//                 to={`/profile`}
//                 color="#e66288"
//                 activeStyle={{ color: "#e66288" }}
//                 >
//                 <Avatar src={avatar}/>
//                 Profile
//                 </Link>
//             </Box>
//                 <Box>
//             <Link
//                 as={NavLink}
//                 exact
//                 to={`/posts`}
//                 color="#e66288"
//                 activeStyle={{ color: "#d09aa4" }}
//             >Posts</Link> 
//             </Box>
//             <Box>
//             <Link as={NavLink} exact to={`/logout`} color="#e66288">Logout</Link></Box>
//             </VStack>
//         </Stack>
//         </Box>
//     );
//     }




// export default NavBar;

// import { Box, Stack, Text, Icon, Link, VStack } from "@chakra-ui/react";
// import { FaHome, FaUserAlt } from "react-icons/fa";
// import { NavLink } from "react-router-dom";
// import {useState, useEffect} from 'react';
// import {useParams} from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

// function NavBar({user}) {
//     const history = useHistory();

//     const {id} = useParams();

//     const thisUser = user?user.id===parseInt(id):false
    
//     const [nav, setNav] = useState({
//         "username":'',
//         "name":'',
//         "avatar":''
//     });

//     useEffect(()=>{
//         fetch('/users/'+id)
//         .then(res=>res.json())
//         .then((data) => {
//             setNav(data);
//         })
//     }, [id])

//     console.log(nav)

//     const {username, avatar} = nav
    
//     return (
//         <Box
//         bg="white"
//         w="260px"
//         minH="100vh"
//         borderRight="1px solid #dbdbdb"
//         position="fixed"
//         >
//         <Stack spacing={6} p={6}>
//         {user ? (
//             <Box as="img" src={avatar} borderRadius="full" boxSize="80px" />
//             ) : (
//             <Box
//                 bg="gray.300"
//                 borderRadius="full"
//                 boxSize="80px"
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//             >
//                 <Text fontWeight="bold" fontSize="30px">
//                 No Profile
//                 </Text>
//             </Box>
//             )}
//             <Text fontWeight="bold" fontSize="18px">
//             {user ? username : "Guest"}
//             </Text>
//         </Stack>
//         </Box>
//     );
// }

// export default NavBar;