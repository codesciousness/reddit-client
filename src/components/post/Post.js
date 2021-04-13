import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './Post.css';
import PostTime from '../postTime/PostTime';
import { setCurrentPost } from '../../features/posts/postsSlice';

const Post = ({ post, isTrending }) => {
    const dispatch = useDispatch();
    const flair = post.flair.split(' ')[0].toLowerCase();
    const words = post.title.split(' ');
    let shortTitle = [];
    for (let i = 0; i <= words.length; i++) {
        if (words[i] && i < 8) {
            shortTitle.push(words[i]);
        }
    }
    shortTitle = shortTitle.join(' ');
    shortTitle += '...';

    const handleClick = ({ target }) => {
        dispatch(setCurrentPost(target.id));
    };

    if (isTrending) {
        return (
            <section className="Post__trending">
                <img className="Post__trending__image" src={`https://source.unsplash.com/140x140/?${flair}&sig=${post.id}`} alt=""/>
                <div className="Post__trending__content">
                    <h2 className="Post__trending__flair">{post.flair}</h2>
                    <Link to={`/posts/${flair}/${post.id}`} className="Post__trending__link"><h3 id={post.id} className="Post__trending__title" onClick={handleClick}>{shortTitle}</h3></Link>
                </div> 
            </section>
        );
    }
    else {
        return (
            <section className="Post__latest">
                <img className="Post__latest__image" src={`https://source.unsplash.com/140x140/?${flair}&sig=${post.id}`} alt=""/>
                <div className="Post__latest__content">
                    <p className="Post__latest__flair">{post.flair}</p>
                    <Link to={`/posts/${flair}/${post.id}`} className="Post__latest__link"><h2 id={post.id} className="Post__latest__title" onClick={handleClick}>{post.title}</h2></Link>
                    <a href={post.url} target="_blank" rel="noreferrer"><button className="Post__latest__button">Read more <i className="fas fa-angle-double-right Post__latest__icon"></i></button></a>
                    <p className="Post__latest__detail">
                        <span className="Post__latest__author">Posted by <strong>{post.author}</strong></span>
                        <PostTime time={post.created} />
                        <span className="Post__latest__comments"><i className="far fa-comment-alt"></i> {post.commentNum}</span>
                    </p>
                </div>
            </section>
        );
    }
}

export default Post;