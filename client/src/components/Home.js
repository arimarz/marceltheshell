import React, { useState, useEffect } from "react";
import Post from './Post'
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';

function Home({user}) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(()=>{
        fetch(`/posts?page=${page}`)
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
    }, [page])

    const postsCard = posts.map(post => <Post key={post.id} post={post} setPosts={setPosts} user={user}/>)

    return (
        <Grid container spacing={3} justifyContent='center'>
					<Grid item xs={3} md={8}>
						{postsCard} 
                        <Button onClick={() => setPage(page + 1)}>Load More</Button>
					</Grid>
				</Grid>
    )
}

export default Home