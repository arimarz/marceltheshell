import React, { useState, useEffect } from "react";
import UserContext from './UserContext';
import { BrowserRouter, Switch, Route, useHistory, useLocation } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {Avatar} from '@mui/material'
import FirstTimeWriting from '../fonts/firsttime.ttf'; 
import Kinder from '../fonts/Kindergarten.ttf';
import Arsenale from '../fonts/Arsenale-White-trial.ttf'
import loading from '../pictures/Marcel_loading.png'
import login from '../pictures/loginBackground.jpg'

import Home from './Home.js';
import Login from './Login.js';
import Profile from './Profile.js';
import NavBar from './NavBar.js';
import NewPost from './NewPost.js';
import Header from './Header.js';

const theme = createTheme({
    palette: {
        primary: {
            main: '#e66288',
        },
        secondary: {
            main: '#e66288',
        },
        error: {
            main: '#e66288',
        },
        background: {
            default: '#747c74',
        },
    },
    typography: {
        fontFamily: "Kinder, FirstTimeWriting, Arsenale",
    },
    spacing: 8,
    components: {
        MuiCssBaseline: {
            styleOverrides: `@font-face {
                font-family: 'FirstTimeWriting';
                src: url(${FirstTimeWriting}) format('truetype');
                }
                @font-face {
                    font-family: 'Kinder';
                    src: url(${Kinder}) format('truetype');
                }
                @font-face {
                    font-family: 'Arsenale';
                    src: url(${Arsenale}) format('truetype');
                }
            `
        },
    },
});

function App() {
    const [user, setUser] = useState(null);
    const history = useHistory();
    const location = useLocation();
    const [userFetched, setUserFetched] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

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
            setTimeout(()=> {
                setIsLoading(false);
            }, 2000)
        })
        )
        
        return (
            <UserContext.Provider value={{ user, setUser }}>
                {isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Avatar src={loading} alt="Loading" sx={{ width: '150px', height: '150px' }}/>
                </div>
                ) : (
                    <Box bg='#747c74' display="grid" gridTemplateColumns="270px 1fr" minHeight="100vh"
                    sx={{
                        backgroundImage: location.pathname === "/login" ? login : '',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                        <NavBar />
                        <Box flexGrow={1} sx ={{gridColumn: 2}}>
                            <Box>
                                {location.pathname !== "/login" && <Header />}
                            </Box>
                            <Box >
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
                        </Box>
                    </Box>
                )}
            </UserContext.Provider>
        );
    }

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
