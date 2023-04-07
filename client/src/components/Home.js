import React, { useState, useEffect } from "react";
import Post from './Post'

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

    console.log(posts)

    const postsCard = posts.map(post => <Post key={post.id} post={post} setPosts={setPosts}/>)

    return (
        <div>
            <ul>{postsCard}</ul>
        </div>
    )
}

export default Home