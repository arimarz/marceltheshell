import React, { useState, useEffect } from "react";
import UserContext from './UserContext';
import { BrowserRouter, Switch, Route, useHistory, useLocation } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FirstTimeWriting from '../fonts/firsttime.ttf'; 
import Kinder from '../fonts/Kindergarten.ttf';
import Arsenale from '../fonts/Arsenale-White-trial.ttf'

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
        
        return (
            <UserContext.Provider value={{ user, setUser }}>
                <Box bg='#747c74' display="grid" gridTemplateColumns="270px 1fr" minHeight="100vh">
                    <NavBar />
                    <Box minHeight='100vh'>
                        <Box>
                            {location.pathname !== "/login" && <Header />}
                        </Box>
                        <Box flexGrow={1}
                            sx={{
                                backgroundImage: location.pathname === "/login" ? "url('https://ca-times.brightspotcdn.com/dims4/default/862760b/2147483647/strip/true/crop/2798x1800+0+0/resize/1200x772!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fe8%2Fae%2Fcc66c9a140d69470e3346945287f%2Fenv-marcel-the-shell-family.jpg')" : '',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}>
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
