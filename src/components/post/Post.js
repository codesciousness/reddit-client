import React from 'react';
import { useDispatch } from 'react-redux';
import './Post.css';
import PostTime from '../postTime/PostTime';
import { setCurrentPost } from '../../features/posts/postsSlice';

const Post = ({ post, isTrending }) => {
    const dispatch = useDispatch();
    const flair = post.flair.split(' ')[0].toLowerCase();
    const words = post.title.split(' ');
    let shortTitle = [];
    for (let i = 0; i <= words.length; i++) {
        if (words[i] && i < 7) {
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
            <section id={post.id} className="Post__trending" onClick={handleClick}>
                <img className="Post__trending__image" src={`https://source.unsplash.com/140x140/?${flair}&sig=${post.id}`} alt=""/>
                <div className="Post__trending__content">
                    <h2 className="Post__trending__flair">{post.flair}</h2>
                    <h3 className="Post__trending__title">{shortTitle}</h3>
                </div> 
            </section>
        );
    }
    else {
        return (
            <section id={post.id} className="Post__latest" onClick={handleClick}>
                <img className="Post__latest__image" src={`https://source.unsplash.com/140x140/?${flair}&sig=${post.id}`} alt=""/>
                <div className="Post__latest__content">
                    <p className="Post__latest__flair">{post.flair}</p>
                    <h2 className="Post__latest__title">{post.title}</h2>
                    <a href={post.url} target="_blank" rel="noreferrer"><button className="Post__latest__button">Read more <i class="fas fa-angle-double-right Post__latest__icon"></i></button></a>
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