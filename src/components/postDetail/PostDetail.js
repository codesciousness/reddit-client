import React from 'react';
import { useSelector } from 'react-redux';
import './PostDetail.css';
import Post from '../post/Post';
import Comments from '../../features/comments/Comments';
import { selectTrendingPosts, selectLatestPosts, selectCurrentPost } from '../../features/posts/postsSlice';

const PostDetail = () => {
    const currentPost = useSelector(selectCurrentPost);
    const trendingPosts = useSelector(selectTrendingPosts);
    const latestPosts = useSelector(selectLatestPosts);

    let post;
    trendingPosts.forEach(postObj => {
        if (postObj.id === currentPost) {
            post = postObj;
        }
    });
    latestPosts.forEach(postObj => {
        if (postObj.id === currentPost) {
            post = postObj;
        }
    });

    if (post) {
        return (
            <section className="PostDetail">
                <Post post={post} isTrending={false} />
                <Comments />
            </section>
        );
    }
    else return null;
}

export default PostDetail;