import React, { useState, useEffect } from 'react';
import {Box, Img, HStack, IconButton, Text} from '@chakra-ui/react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function Post({ user, post, setPosts}) {
    const [showAllComments, setShowAllComments] = useState(false);
    const { image, quote, original, user_id, created_at } = post;

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
                setPosts((posts)=> posts.map((onePost)=> onePost.id === post.id ? {...onePost, is_liked: false}: onePost))
            } else {
                console.log(res.statusText);
            }
            })
            .catch((err) => {
            console.log(err);
            })
            .then(() => {
                // Update the number of likes for this post
                fetch(`/posts/${post.id}/likes`)
                    .then((res) => res.json())
                    .then((likes) => {
                    setPosts((posts) => posts.map((onePost) => onePost.id === post.id ? {...onePost, liked_amount: likes.length} : onePost));
                    })
                    .catch((err) => {
                    console.log(err);
                    });
                });
        } else {
        fetch(`/posts/${post.id}/likes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user.id }),
        })
            .then((res) => {
            if (res.ok) {
                setPosts((posts)=> {
                    return posts.map((onePost)=> onePost.id === post.id ? {...onePost, is_liked: true} : onePost)
                })
            } else {
                console.log(res.statusText);
            }
            })
            .catch((err) => {
            console.log(err);
            })
            .then(() => {
                // Update the number of likes for this post
                fetch(`/posts/${post.id}/likes`)
                    .then((res) => res.json())
                    .then((likes) => {
                        setPosts((posts) => posts.map((onePost) => onePost.id === post.id ? {...onePost, liked_amount: likes.length} : onePost));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                });
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
            <IconButton
            aria-label="like"
            icon={post.is_liked ? <FaHeart /> : <FaRegHeart />}
            onClick={handleLikeClick}
            />
            <p>Likes: {post.liked_amount}</p>
            <p>{commentItems}</p>
        </Box>
        </HStack>
    );
}

export default Post;