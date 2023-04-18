import React, { useState, useEffect, useContext } from 'react';
import {Box, Img, HStack, Text, Button} from '@chakra-ui/react'
import UserContext from './UserContext';
import liked from '../pictures/liked_shell.png'
import unliked from '../pictures/unliked_shell.jpg'
import { makeStyles, styled } from '@mui/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import EditComment from './EditComment.js';
import Video from './Video.js';
import { Typography } from '@mui/material';


const useStyles = makeStyles({
    media: {
        height: 0,
        paddingTop: '100%',
    }
})

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    }));
    

    function Post({ post, setPosts}) {
        const userGrab = useContext(UserContext)
        const [commentValue, setCommentValue] = useState("");
        const { media } = useStyles()
        const [expanded, setExpanded] = useState(false);
        const [showAllComments, setShowAllComments] = useState(false);
        if (!userGrab.user) return 'Loading'
        const { username, avatar, id } = userGrab.user
        const { image, quote, original, user_id, created_at } = post;

        const handleExpandClick = () => {
            setExpanded(!expanded);
            setShowAllComments(!showAllComments);
        };
        const commentItems = showAllComments
            ? post.comments.map((comment) => (
                <EditComment
                key= {comment.id}
                comment={comment}
                post={post}
                setPosts={setPosts}/>
            ))
            : null;
    
    
        const handleLikeClick = () => {
            // Check if the user has already liked this post
            if (post.is_liked) {
                // User has already liked the post, removes like
                fetch(`/posts/${post.id}/likes/${id}`, { method: 'DELETE' })
                    .then((res) => {
                        if (res.ok) {
                            setPosts((posts) => posts.map((onePost) => onePost.id === post.id ? { ...onePost, is_liked: false, liked_amount: onePost.liked_amount - 1 } : onePost))
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
                    body: JSON.stringify({ user_id: id }),
                })
                    .then((res) => {
                        if (res.ok) {
                            setPosts((posts) => {
                                return posts.map((onePost) => onePost.id === post.id ? { ...onePost, is_liked: true, liked_amount: onePost.liked_amount + 1 } : onePost)
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
    
        const handleCommentChange = (event) => {
            setCommentValue(event.target.value);
        };

            const handleCommentSubmit = (e) => {
                e.preventDefault();
                fetch(`/posts/${post.id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comment: commentValue }),
                })
                .then((res) => {
                    if (res.ok) {
                    return res.json();
                    } else {
                    throw new Error('Failed to create comment');
                    }
                })
                .then((newComment) => {
                    setPosts((posts) => {
                    return posts.map((onePost) => {
                        if (onePost.id === post.id) {
                        const updatedComments = [...onePost.comments, newComment];
                        return { ...onePost, comments: updatedComments };
                        } else {
                        return onePost;
                        }
                    });
                    });
                    setCommentValue("");
                })
                .catch((err) => {
                    console.log(err);
                });
            };
            
            const randomDate = () => {
                const currentDate = new Date();
                const startYear = currentDate.getFullYear() - 10;
                const endYear = currentDate.getFullYear();
                const start = new Date(startYear, 0, 1);
                const end = new Date(endYear, 11, 31);
                return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            };
            return (
                <Card style={{ marginBottom: "30px" }}>
                    <CardHeader
                        style={{ fontSize: '5rem' }} 
                        avatar={<Avatar src={post.user.avatar} style={{ width: 70, height: 70 }} />} 
                        title={
                            <span style={{ fontFamily: 'Comic Sans MS, sans-serif', fontWeight: 'bold', fontSize: '1.5rem' }}>{quote}</span> 
                        }
                        subheader={
                            <span style={{ fontFamily: 'Comic Sans MS, sans-serif', fontWeight: 'bold', fontSize: '1.25rem' }}>
                                {randomDate().toDateString()}
                            </span> // Set the desired font for the subheader
                        }
                    />
                    <Box display="flex" justifyContent="center">
                        <Video image={image} />
                    </Box>
                    <CardActions disableSpacing style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton onClick={handleLikeClick} style={{ fontSize: '3.5rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                <Img
                                    aria-label="like"
                                    src={post.is_liked ? liked : unliked}
                                    style={{ width: 100 }}
                                />
                                <span style={{ marginLeft: '8px' }}>{post.liked_amount}</span>
                            </span>
                        </IconButton>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon style={{ fontSize: '4rem' }}/>
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            {commentItems}
                            <form onSubmit={handleCommentSubmit}>
                                <input
                                    type="text"
                                    placeholder="Add a comment"
                                    value={commentValue}
                                    onChange={handleCommentChange}
                                />
                                <button type="submit">Post</button>
                            </form>
                        </CardContent>
                    </Collapse>
                </Card>
            );
}

export default Post;
