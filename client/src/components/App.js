import React, { useState, useEffect } from "react";
import UserContext from './UserContext';
import { BrowserRouter, Switch, Route, useHistory, useLocation } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../custom-font.css';
import { makeStyles } from '@mui/styles';

import Home from './Home.js';
import Login from './Login.js';
import Profile from './Profile.js';
import NavBar from './NavBar.js';
import NewPost from './NewPost.js';
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
        fontFamily: 'FirstTimeWriting!, Comic Sans MS, sans-serif',
        },
        spacing: 8,
    });

    const useStyles = makeStyles((theme) => ({
        loginPage: {
            backgroundImage: "url('https://ca-times.brightspotcdn.com/dims4/default/862760b/2147483647/strip/true/crop/2798x1800+0+0/resize/1200x772!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fe8%2Fae%2Fcc66c9a140d69470e3346945287f%2Fenv-marcel-the-shell-family.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            },
        }));
        

function App() {
    const [user, setUser] = useState(null);
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const [userFetched, setUserFetched] = useState(false);

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
            setUserFetched(true);
        })
        )
        // useEffect(() => {
        //     if (userFetched && !user) {
        //         history.push('/login');
        //     }
        // }, [user, userFetched, history]);
        
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Flex flexDirection="row" height="100vh">
                <Box bg="#7f7c5b" color="#7f7c5b" width="250px" position='fixed' zIndex={100}>
                <NavBar />
                </Box>
                <Flex flexDirection="column" flexGrow={1}>
                    {location.pathname !== '/login' && <Header position="relative" zIndex={50} />}
                    <Box className={location.pathname === '/login' ? classes.loginPage : ''} flexGrow={1}>
                        <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route path="/profile/:id" exact>
                        <Profile />
                    </Route>
                    <Route path="/post/create" exact>
                        <NewPost />
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
