import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import { Grid } from "@mui/material";

function Home({ user }) {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [playingIndex, setPlayingIndex] = useState(-1);

    useEffect(() => {
        fetch("/posts")
        .then((response) => {
            if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => setPosts(data))
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, []);

    const fetchMoreData = () => {
        fetch(`/posts?page=${Math.ceil(posts.length / 5) + 1}&limit=5`)
        .then((response) => {
            if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data.length === 0) {
            setHasMore(false);
            return;
            }
            setPosts((prevPosts) => [...prevPosts, ...data]);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    };

    return (
        <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more posts</p>}
        >
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={3} md={8}>
            {posts.map((post, index) => (
                <Post
                key={post.id}
                post={post}
                user={user}
                setPosts={setPosts}
                setPlayingIndex={setPlayingIndex}
                playingIndex={playingIndex}
                index={index}
                />
            ))}
            </Grid>
        </Grid>
        </InfiniteScroll>
    );
    }

export default Home;