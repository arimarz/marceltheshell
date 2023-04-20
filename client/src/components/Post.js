import React, { useState, useContext } from 'react';
import UserContext from './UserContext';
import liked from '../pictures/liked_shell.png'
import unliked from '../pictures/unliked_shell.png'
import EditComment from './EditComment.js';
import Video from './Video.js';
import { Card, CardHeader, Avatar, Typography, Box, IconButton, CardActions, Collapse, CardContent, Button, TextField, Link, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
                    console.log(newComment)
                    setPosts((posts) => {
                        return posts.map((onePost) => {
                        console.log(onePost.comments)
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
                <Card sx={{ backgroundColor: '#b4b4ac', marginTop: '30px' }}>
                    <CardHeader
                        avatar={<Avatar src={post.user.avatar} sx={{ width: 70, height: 70, borderRadius: '50%', border: '3px solid #544a2a' }} />}
                        title={
                            <Typography variant="h4" fontWeight="bold">
                                {quote}
                            </Typography>
                        }
                        subheader={
                            <Typography variant="h5" fontWeight="bold">
                                {new Date(post.created_at).toDateString()}
                            </Typography>
                        }
                    />
                    <Box display="flex" justifyContent="center">
                        <Video image={image} />
                    </Box>
                    <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton onClick={handleLikeClick} sx={{ fontSize: '3.5rem' }}>
                            <Box display="flex" alignItems="center">
                                <img
                                    aria-label="like"
                                    src={post.is_liked ? liked : unliked}
                                    style={{ width: 100 }}
                                />
                                <Box ml={1} fontFamily="Kinder">
                                    {post.liked_amount}
                                </Box>
                            </Box>
                        </IconButton>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon sx={{ fontSize: '4rem' }} />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            {commentItems}
                            <form onSubmit={handleCommentSubmit}>
                                <Box sx={{ p: 'var(--Card-padding)', display: 'flex' }}>
                                    <IconButton size="small" sx={{ ml: -1 }}>
                                        <Avatar src={avatar} sx={{ width: 45, height: 45, borderRadius: '50%', border: '3px solid #544a2a' }}/>
                                    </IconButton>
                                    <TextField
                                        size="small"
                                        placeholder="Add a comment…"
                                        value={commentValue}
                                        onChange={handleCommentChange}
                                        sx={{ flexGrow: 1, mr: 1 }}
                                        InputProps={{
                                            sx: {
                                            fontSize: '1.5rem',
                                            fontWeight:"bold",
                                            '&:focus': { color: '#544a2a' },
                                            }
                                        }}
                                        />
                                    <Button type="submit" variant="contained" sx={{backgroundColor: "#645c5c"}}>
                                        Post
                                    </Button>
                                </Box>
                            </form>
                        </CardContent>
                    </Collapse>
                </Card>
            );
                    }

export default Post;
