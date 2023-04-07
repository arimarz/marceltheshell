import React from 'react';

function Post({ user, post }) {
    
    console.log(post)

    const { image, quote, orginial, user_id, created_at} = post;

    const commentItems = post.comments.map(comment => (
        <div key={comment.id}>
            <p>{comment.comment}</p>
            <p>{comment.user.username}</p>
        </div>
    ));
    return (
        <li >
        <div className="center">
        <img src={image} alt='Image Post' />
            <h3 >{quote}</h3>
            <p>{orginial}</p>
            <p>{user_id}</p>
            <p>{created_at}</p>
            <p>Likes: {post.likes.length}</p>
            <p>{commentItems}</p>
        </div>
        </li>
    );
    }

    export default Post;