import React from 'react';
import './CommentList.css';
import Comment from '../comment/Comment';

const comment1 = {
    id: "gt3gco7",
    author: "Leduckduckgoose",
    body: "No but the cycle is pretty easy to see. And I think people have known it for ages.",
    ups: 2
};

const comment2 = {
    id: "gt1bryg",
    author: "ostentatiousbro",
    body: "You have it all figured out.",
    ups: 0
};

const comment3 = {
    id: "gt22wft",
    author: "acmilanginger33",
    body: "That makes sense. I didn’t think about the fact that the dead tree becomes it’s own ecosystem.",
    ups: 3
};

const comments = [comment1, comment2, comment3];

const CommentList = ({ Comments }) => {
    return (
        <section className="CommentList">
            <h3 className="CommentList__title">Comments</h3>
            {comments.map(comment => <Comment comment={comment} />)}
        </section>
    );
}

export default CommentList;