import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from './Home.js';
import Login from './Login.js';
import Profile from './Profile.js';
import NavBar from './NavBar.js';
// import NewPost from './NewPost.js';
// import Posts from './Posts.js';
// import EditPost from './EditPost.js';
// import PostsList from './PostsList.js';
import Header from './Header.js';

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
    <div>
        <Header/>
        <NavBar user={user} setUser={setUser}/>
        <div className='body'>
            <Switch>
                <Route path="/" exact>
                    <Home user={user}/>
                </Route>
                <Route exact path="/login">
                    <Login setUser={setUser}/>
                </Route>
                <Route path="/profile/:id" exact>
                        <Profile user={user}/>
                </Route>
            </Switch>  
        </div>
    </div>
    );
}

//export default App;
function WrappedApp() {
    return (
        <BrowserRouter>
        <App />
        </BrowserRouter>
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