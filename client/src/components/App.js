import React, { useState, useEffect } from "react";
import UserContext from './UserContext';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Home from './Home.js';
import Login from './Login.js';
import Profile from './Profile.js';
import NavBar from './NavBar.js';
// import NewPost from './NewPost.js';
// import Posts from './Posts.js';
// import EditPost from './EditPost.js';
// import PostsList from './PostsList.js';
import Header from './Header.js';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
        },
        typography: {
        fontFamily: 'Roboto, sans-serif',
        },
        spacing: 8,
    });

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser()
    },[])

    const fetchUser = () => (
        fetch('/authorized')
        .then(res => {
            if(res.ok){
                res.json()
                .then(data => {
                    setUser(data)
                })
            } else {
                setUser(null)
            }
        })
    )

    return (
        <UserContext.Provider value={{ user, setUser }}>
        <Flex flexDirection="row" height="100vh">
            <Box bg="#7f7c5b" color="#7f7c5b" width="250px"
            position='fixed' zIndex={100}>
                <NavBar/>
            </Box>
            <Flex flexDirection="column" flexGrow={1}>
                <Header position="relative" zIndex={50}/>
                <Box className='body' flexGrow={1}>
                    <Switch>
                        <Route path="/" exact>
                            <Home/>
                        </Route>
                        <Route exact path="/login">
                            <Login/>
                        </Route>
                        <Route path="/profile/:id" exact>
                            <Profile/>
                        </Route>
                    </Switch>  
                </Box>
            </Flex>
        </Flex>
    </UserContext.Provider>
    );
}


//export default App;
function WrappedApp() {
        return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
            <App />
            </BrowserRouter>
        </ThemeProvider>
        )
    }

export default WrappedApp;
//<NavBar user={user} setUser={setUser}></NavBar>
// <Route path="/profile/:id" exact>
//                         <Profile user={user}/>
//                     </Route>
//                     <Route path="/newpost" exact>
//                         <NewPost user={user}/>
//                     </Route>
//                     <Route path="/posts/:id" exact>
//                         <EditPost user={user}/>
//                     </Route>
//                     <Route path="/postslist" exact>
//                         <PostsList user={user}/>
//                     </Route>
//                     <Route path="/posts" exact>
//                         <Posts user={user}/>
//                     </Route>
//                     <Route path="*">
//                         <h3>404 Not Found</h3>
//                     </Route>