import React from 'react';
import './Comment.css';
import PostTime from '../postTime/PostTime';

const Comment = ({ comment }) => {
    return (
        <section id={comment.id} className="Comment">
            <p className="Comment__author">{comment.author} | <PostTime time={comment.created} /></p>
            <p className="Comment__body">{comment.body}</p>
            <p className="Comment__ups"><i className="fas fa-arrow-up"></i> {comment.ups} Ups</p>
        </section>
    );
}

export default Comment;