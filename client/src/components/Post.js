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
    

    function Post({ post, setPosts }) {
        const userGrab = useContext(UserContext)
        const [commentValue, setCommentValue] = useState("");
        const { media } = useStyles()
        const [expanded, setExpanded] = useState(false);
        const [showAllComments, setShowAllComments] = useState(false);
        if (!userGrab.user) return 'Loading'
        const { username, avatar, id } = userGrab.user
        const { image, quote, original, user_id, created_at } = post;
        console.log(post)
        const handleExpandClick = () => {
            setExpanded(!expanded);
            setShowAllComments(!showAllComments);
        };

        const handleCommentEdit = (comment.id, newComment) => {
            fetch(`/comments/${comment.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comment: newComment }),
            })
            .then((res) => {
                if (res.ok) {
                setPosts((posts) => {
                    return posts.map((onePost) => {
                    if (onePost.id === post.id) {
                        const updatedComments = onePost.comments.map((comment) => {
                        if (comment.id === commentId) {
                            return { ...comment, comment: newComment };
                        } else {
                            return comment;
                        }
                        });
                        return { ...onePost, comments: updatedComments };
                    } else {
                        return onePost;
                    }
                    });
                });
                } else {
                console.log(res.statusText);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        };
    
        const commentItems = showAllComments
            ? post.comments.map((comment) => (
                <Box display="flex" key={comment.id}>
                    <Avatar src={comment.user.avatar} />
                    <Box>
                        <Text fontWeight="bold">{comment.user.username}</Text>
                        <Text> {id === comment.user.id ? <><EditIcon onClick={handleCommentEdit} />
                        <DeleteOutlineIcon/> </>: null} {comment.comment}</Text>
                        
                    </Box>
                </Box>
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

        const handleCommentDelete = (commentId) => {
            fetch(`/comments/${commentId}`, {
                method: 'DELETE',
                })
                .then((res) => {
                    if (res.ok) {
                    setPosts((posts) => {
                        return posts.map((onePost) => {
                        if (onePost.id === post.id) {
                            const updatedComments = onePost.comments.filter(
                            (comment) => comment.id !== commentId
                            );
                            return { ...onePost, comments: updatedComments };
                        } else {
                            return onePost;
                        }
                        });
                    });
                    } else {
                    console.log(res.statusText);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
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
            
            return (
                <Card>
                <CardHeader
                    avatar={<Avatar src={post.user.avatar} />}
                    title={quote}
                    subheader={new Date(created_at).toDateString()}
                />
                <CardMedia image={image} className={media} />
                <CardActions disableSpacing>
                    <IconButton onClick={handleLikeClick}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <Img
                        aria-label="like"
                        src={post.is_liked ? liked : unliked}
                        style={{ width: 60 }}
                        />
                        <span style={{ marginLeft: '8px' }}>{post.liked_amount}</span>
                    </span>
                    </IconButton>
                    <ChatBubbleOutlineRoundedIcon/>
                    <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    >
                    <ExpandMoreIcon />
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

{/* // <HStack spacing="24px">
        // <Box>
        //     <img src={image} alt="Image Post" />
        //     <h3>{quote}</h3>
        //     <p>{original}</p>
        // </Box>
        // <Box>
        //     <Img
        //     aria-label="like"
        //     src={post.is_liked ? {liked} : {unliked} }
        //     onClick={handleLikeClick}
        //     />
        //     <p>Likes: {post.liked_amount}</p>
        //     <Box>
        //     {commentItems}
        //     {post.comments.length > 5 && (
        //     <Button onClick={() => setShowAllComments(!showAllComments)}>
        //         {showAllComments ? "Hide comments" : "Show all comments"}
        //     </Button>
        //     )}
        // </Box>
        // </Box>
        // </HStack> */}