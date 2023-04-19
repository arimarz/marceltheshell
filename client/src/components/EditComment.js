import React, { useContext, useState } from 'react';
import { Box, Typography, Input, Button, IconButton, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Edit as EditIcon, DeleteOutline as DeleteOutlineIcon } from '@mui/icons-material';
import UserContext from './UserContext';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginBottom: theme.spacing(2),
    },
    avatar: {
        marginRight: theme.spacing(2),
    },
    comment: {
        flexGrow: 1,
    },
    button: {
        marginLeft: theme.spacing(1),
    },
    }));

    function EditComment({ comment, setPosts, post }) {
        const userContext = useContext(UserContext);
        const { id } = userContext.user || {};
    const classes = useStyles();
    const [isEditing, setIsEditing] = useState(false);
    const [updatedComment, setUpdatedComment] = useState(comment.comment);

    if (!userContext.user || !comment.user) {
        return null;
    }

    const handleCommentEdit = () => {
        fetch(`/comments/${comment.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: updatedComment }),
        })
        .then((res) => {
            if (res.ok) {
            return res.json();
            } else {
            throw new Error('Failed to update comment');
            }
        })
        .then((updatedComment) => {
            setPosts((posts) => {
            return posts.map((onePost) => {
                if (onePost.id === comment.post_id) {
                const updatedComments = onePost.comments.map((c) =>
                    c.id === updatedComment.id ? updatedComment : c
                );
                return { ...onePost, comments: updatedComments };
                } else {
                return onePost;
                }
            });
            });
            setUpdatedComment(updatedComment)
            setIsEditing(false);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const handleCommentDelete = () => {
        fetch(`/comments/${comment.id}`, {
        method: 'DELETE',
        })
        .then((res) => {
            if (res.ok) {
            setPosts((posts) => {
                return posts.map((onePost) => {
                if (onePost.id === comment.post_id) {
                    const updatedComments = onePost.comments.filter(
                    (c) => c.id !== comment.id
                    );
                    return { ...onePost, comments: updatedComments };
                } else {
                    return onePost;
                }
                });
            });
            setUpdatedComment('');
            setIsEditing(false);
            } else {
            throw new Error('Failed to delete comment');
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <Box className={classes.root}>
            <Avatar src={comment.user.avatar} />
            <Box className={classes.comment}>
                <Typography variant="subtitle1" fontWeight="bold">
                {comment.user.username}
                </Typography>
                {isEditing ? (
                <Box display="flex" alignItems="center">
                    <Input
                    value={updatedComment}
                    onChange={(e) => {
                        setUpdatedComment(e.target.value);
                    }}
                    rows={1}
                    fullWidth
                    />
                    <Box flexGrow={1} />
                    <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCommentEdit}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </Button>
                    </Box>
                </Box>
                ) : (
                <Box display="flex" alignItems="center">
                    <Box flexGrow={1}>
                    <Typography variant="body1">{comment.comment}</Typography>
                    </Box>
                    {id === comment.user.id && (
                    <Box>
                        <IconButton onClick={() => setIsEditing(true)}>
                        <EditIcon />
                        </IconButton>
                        <IconButton onClick={handleCommentDelete}>
                        <DeleteOutlineIcon />
                        </IconButton>
                    </Box>
                    )}
                </Box>
                )}
            </Box>
            </Box>
        );
    }

export default EditComment;