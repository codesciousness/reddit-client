import React from 'react';
import './CommentLoader.css';

const CommentLoader = () => {
    return (
        <section className="CommentLoader">
            <p className="CommentLoader__author"><strong>Comment author</strong> | <strong>Post time</strong></p>
            <p className="CommentLoader__body">Comment body</p>
            <p className="CommentLoader__ups"><i className="fas fa-arrow-up"></i> <strong>Ups#</strong> Ups</p>
        </section>
    );
}

export default CommentLoader;