import React from 'react';
import './PostDetail.css';
import Post from '../post/Post';
import CommentList from '../commentList/CommentList';

const PostDetail = ({ post }) => {
    return (
        <section className="PostDetail">
            <Post post={post} isTrending={false} />
            <CommentList comments={post.comments} />
        </section>
    );
}

export default PostDetail;