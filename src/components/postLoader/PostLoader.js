import React from 'react';
import './PostLoader.css';

const PostLoader = ({ isTrending }) => {
    if (isTrending) {
        return (
            <section className="PostLoader__trending">
                <div className="PostLoader__trending__content">
                    <h2 className="PostLoader__trending__flair">Post flair name</h2>
                    <h3 className="PostLoader__trending__title">Short title of the article...</h3>
                </div> 
            </section>
        );
    }
    else {
        return (
            <section className="PostLoader__latest">
                <div className="PostLoader__latest__image"></div>
                <div className="PostLoader__latest__content">
                    <p className="PostLoader__latest__flair">Post flair name</p>
                    <h2 className="PostLoader__latest__title">Complete title of the article</h2>
                    <p className="PostLoader__latest__detail">
                        <span className="PostLoader__latest__author">Post author</span>
                        <span className="PostLoader__latest__time">Post time</span>
                        <span className="PostLoader__latest__comments">Comment#</span>
                    </p>
                </div>
            </section>
        );
    }
}

export default PostLoader;