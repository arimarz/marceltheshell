import React, { useState, useEffect, useContext } from 'react';
import {Box, Img, HStack, IconButton, Text, Button} from '@chakra-ui/react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import UserContext from './UserContext';
import liked from '../pictures/liked_shell.png'
import unliked from '../pictures/unliked_shell.jpg'



function Post({ post, setPosts}) {
    const [showAllComments, setShowAllComments] = useState(false);
    const { image, quote, original, user_id, created_at } = post;
    const {user} = useContext(UserContext)

    const commentsToDisplay = showAllComments ? post.comments : post.comments.slice(0, 5);

    const commentItems = commentsToDisplay.map((comment) => (
        <div key={comment.id}>
            <Text fontWeight="bold" display="inline">{comment.user.username}</Text>
            <Text display="inline"> {comment.comment}</Text>
            </div>
        ));

    const handleLikeClick = () => {
        // Check if the user has already liked this post

        if (post.is_liked) {
        // User has already liked the post, removes like
        fetch(`/posts/${post.id}/likes/${user.id}`, { method: 'DELETE' })
            .then((res) => {
            if (res.ok) {
                setPosts((posts)=> posts.map((onePost)=> onePost.id === post.id ? {...onePost, is_liked: false, liked_amount: onePost.liked_amount - 1}: onePost))
            } else {
                console.log(res.statusText);
            }
            })
            .catch((err) => {
            console.log(err);
            })
        } else {
        fetch(`/posts/${post.id}/likes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user.id }),
        })
            .then((res) => {
            if (res.ok) {
                setPosts((posts)=> {
                    return posts.map((onePost)=> onePost.id === post.id ? {...onePost, is_liked: true, liked_amount: onePost.liked_amount + 1} : onePost)
                })
            } else {
                console.log(res.statusText);
            }
            })
            .catch((err) => {
            console.log(err);
            })
            }
        };

    return (
        <HStack spacing="24px">
        <Box>
            <img src={image} alt="Image Post" />
            <h3>{quote}</h3>
            <p>{original}</p>
        </Box>
        <Box>
            <Img
            aria-label="like"
            src={post.is_liked ? {liked} : {unliked} }
            onClick={handleLikeClick}
            />
            <p>Likes: {post.liked_amount}</p>
            <Box>
            {commentItems}
            {post.comments.length > 5 && (
            <Button onClick={() => setShowAllComments(!showAllComments)}>
                {showAllComments ? "Hide comments" : "Show all comments"}
            </Button>
            )}
        </Box>
        </Box>
        </HStack>
    );
}

export default Post;