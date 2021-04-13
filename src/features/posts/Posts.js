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
                    <p className="Posts__trending__error">Error: Request failed! Please try again. ¯\_(ツ)_/¯</p>
                </section>
            );
        }
        return (
            <section className="Posts__trending">
                <ul>
                    {trendingPosts.map(post => <li key={post.id}><Post post={post} isTrending={true} /></li>)}
                </ul>
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
                    <p className="Posts__latest__error">Error: Request failed! Please try again. ¯\_(ツ)_/¯</p>
                </section> 
            );
        }
        return (
            <section className="Posts__latest">
                <ul>
                    {latestPosts.map(post => <li key={post.id}><Post post={post} isTrending={false} /></li>)}
                </ul>
            </section> 
        );
    }
}

export default Posts;