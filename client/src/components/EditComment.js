import React, { useContext, useState } from 'react';
import { Box, Typography, Input, Button, IconButton, Avatar } from '@mui/material';
import { Edit as EditIcon, DeleteOutline as DeleteOutlineIcon } from '@mui/icons-material';
import UserContext from './UserContext';

function EditComment({ comment, setPosts, post }) {
    const userContext = useContext(UserContext);
    const { id } = userContext.user || {};
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
        <Box sx={{ display: 'flex', marginBottom: 2 }}>
            <Avatar src={comment.user.avatar} sx={{ marginRight: 1.5, width: 60, height: 60, borderRadius: '50%', border: '3px solid #544a2a' }}/>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" component='span' fontWeight="bold" >
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
                    sx={{fontSize: '1.5rem', fontWeight: 'bold'}}
                    />
                    <Box flexGrow={1} />
                    <Box>
                    <Button
                        variant="contained"
                        sx={{backgroundColor: "#645c5c"}}
                        onClick={handleCommentEdit}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        sx={{backgroundColor: "#e66288"}}
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </Button>
                    </Box>
                </Box>
                ) : (
                <Box display="flex" alignItems="center">
                    <Box flexGrow={1}>
                    <Typography sx={{ fontSize: '1.5rem' }} fontWeight="bold" component='span'>{comment.comment}</Typography>
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