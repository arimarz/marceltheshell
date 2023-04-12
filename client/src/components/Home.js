import React, { useState, useEffect } from "react";
import Post from './Post'
import { Grid } from "@mui/material";

function Home({user}) {
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        fetch('/posts')
        .then(response => {
            if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
            }
            return response.json();
        })
        .then(data =>setPosts(data))
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        }, [])

    const postsCard = posts.map(post => <Post key={post.id} post={post} setPosts={setPosts} user={user}/>)

    return (
        <Grid container spacing={3} justifyContent='center'>
					<Grid item xs={4} md={8}>
						{postsCard} 
					</Grid>
				</Grid>
    )
}

export default Home