import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Posts.css';
import Post from '../../components/post/Post';
import Loader from '../../components/loader/Loader';
import { selectSearchTerm } from '../searchTerm/searchTermSlice';
import { selectFilter } from '../filter/filterSlice';
import { selectFilteredTrendingPosts,
        selectFilteredLatestPosts,
        selectLoadingTrendingPosts,
        selectLoadTrendingPostsError,
        selectLoadingLatestPosts,
        selectLoadLatestPostsError,
        loadTrendingPosts,
        loadLatestPosts } from './postsSlice';

const Posts = ({ isTrending }) => {
    const searchTerm = useSelector(selectSearchTerm);
    const filter = useSelector(selectFilter);
    const trendingPosts = useSelector(selectFilteredTrendingPosts);
    const latestPosts = useSelector(selectFilteredLatestPosts);
    const loadingTrendingPosts = useSelector(selectLoadingTrendingPosts);
    const loadingLatestPosts = useSelector(selectLoadingLatestPosts);
    const loadTrendingPostsError = useSelector(selectLoadTrendingPostsError);
    const loadLatestPostsError = useSelector(selectLoadLatestPostsError);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTrendingPosts());
        dispatch(loadLatestPosts());
    }, [filter, searchTerm, dispatch]);

    if (isTrending) {
        if (loadingTrendingPosts) {
            return (
                <section className="Posts__trending">
                    <Loader />
                </section>
            );
        }
        if (loadTrendingPostsError) {
            return (
                <section className="Posts__trending">
                    <p className="Posts__trending__error">Request failed! Please reload.</p>
                </section>
            );
        }
        return (
            <section className="Posts__trending">
                {trendingPosts.map(post => <Post post={post} isTrending={true} />)}
            </section>
        );
    }
    else {
        if (loadingLatestPosts) {
            return (
                <section className="Posts__latest">
                    <Loader />
                </section> 
            );
        }
        if (loadLatestPostsError) {
            return (
                <section className="Posts__latest">
                    <p className="Posts__latest__error">Request failed! Please reload.</p>
                </section> 
            );
        }
        return (
            <section className="Posts__latest">
                {latestPosts.map(post => <Post post={post} isTrending={false} />)}
            </section> 
        );
    }
}

export default Posts;