import React from 'react';
import './Post.css';
import PostTime from '../postTime/PostTime';

const Post = ({ post, isTrending }) => {
    const title = post.title;
    const words = title.split(' ');
    let shortTitle = [];
    let longTitle = [];
    for (let i = 0; i <= words.length; i++) {
        if (words[i] && i < 8) {
            shortTitle.push(words[i]);
        }
        if (words[i] && i < 25) {
            longTitle.push(words[i]);
        }
    }
    shortTitle = shortTitle.join(' ');
    longTitle = longTitle.join(' ');
    shortTitle += '...';
    longTitle += '...';

    if (isTrending) {
        return (
            <section id={post.id} className="Post__trending">
                <img className="Post__trending__image" src={post.src += `&sig=${Math.random()}`} alt=""/>
                <div className="Post__trending__content">
                    <h2 className="Post__trending__flair">{post.flair}</h2>
                    <h3 className="Post__trending__title">{shortTitle}</h3>
                </div> 
            </section>
        );
    }
    else {
        return (
            <section id={post.id} className="Post__latest">
                <img className="Post__latest__image" src={post.src += `&sig=${Math.random()}`} alt=""/>
                <div className="Post__latest__content">
                    <p className="Post__latest__flair">{post.flair}</p>
                    <h2 className="Post__latest__title">{longTitle}</h2>
                    <button className="Post__latest__button">Read more <i class="fas fa-angle-double-right Post__latest__icon"></i></button>
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