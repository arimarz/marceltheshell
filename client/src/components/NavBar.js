import { Box, Stack, Text, Icon, Link, VStack, Img} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import UserContext from './UserContext';
import {useContext} from 'react';
import home from '../pictures/home_shell.png'
import {Avatar} from '@mui/material'

function NavBar() {
    const userGrab = useContext(UserContext)
    const imageStyle = {
        ':hover':{

        }
    }
    console.log(userGrab.user)
    if (!userGrab.user) return <Link as={NavLink} exact to={`/login`} activeStyle={{ color: "#d09aa4" }}>
    Login
    </Link>
    const {username, avatar} = userGrab.user
    return (
        <Box
        bg="#7f7c5b"
        w="260px"
        minH="100vh"
        borderRight="1px solid #dbdbdb"
        position="fixed"
        >
        <Stack spacing='20px' p={6}>
            <VStack spacing={5} align="stretch">
            <Link as={NavLink} exact to="/" activeStyle={{ color: "#e66288" }}>
                <Avatar src={home} />
                Home
                </Link>
            <Text fontWeight="bold" fontSize="18px" color='#d09aa4' >
            {username}
            </Text>
            <Box>
            <Link
                as={NavLink}
                exact
                to={`/profile`}
                color="#e66288"
                activeStyle={{ color: "#e66288" }}
                >
                <Avatar src={avatar}/>
                Profile
                </Link>
            </Box>
                <Box>
            <Link
                as={NavLink}
                exact
                to={`/posts`}
                color="#e66288"
                activeStyle={{ color: "#d09aa4" }}
            >Posts</Link> 
            </Box>
            <Box>
            <Link as={NavLink} exact to={`/logout`} color="#e66288">Logout</Link></Box>
            </VStack>
        </Stack>
        </Box>
    );
    }




export default NavBar;

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