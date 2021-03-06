import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './Comments.css';
import Comment from '../../components/comment/Comment';
import CommentLoader from '../../components/commentLoader/CommentLoader';
import { selectCurrentPost } from '../posts/postsSlice';
import { selectComments, selectLoadingComments, selectLoadCommentsError, loadComments } from './commentsSlice';

const Comments = () => {
    const comments = useSelector(selectComments);
    const loadingComments = useSelector(selectLoadingComments);
    const loadCommentsError = useSelector(selectLoadCommentsError);
    const currentPost = useSelector(selectCurrentPost);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentPost) {
            dispatch(loadComments(currentPost));
        }
    }, [currentPost, dispatch]);

    if (loadingComments) {
        return (
            <section className="Comments">
                <h3 className="Comments__title">Comments Loading...</h3>
                <CommentLoader />
                <CommentLoader />
            </section>
        );
    }
    if (loadCommentsError) {
        return (
            <section className="Comments">
                <h3 className="Comments__title">Comments</h3>
                <p className="Comments__error">Error: Request failed! Please try again. ¯\_(ツ)_/¯</p>
                <p className="Comments__error">Or Return to <Link to='/' className="Comments__link"><i className="fas fa-home Comments__icon"></i> Home</Link></p>
            </section>
        );
    }
    return (
        <section className="Comments">
            <h3 className="Comments__title">Comments</h3>
            <ul>
                {comments.map(comment => <li key={comment.id}><Comment comment={comment} /></li>)}
            </ul>
        </section>
    );
}

export default Comments;