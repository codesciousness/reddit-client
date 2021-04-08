import React from 'react';
import './Post.css';
import PostTime from '../postTime/PostTime';

const flairs = ['Astronomy', 'Biology', 'Chemistry', 'Computer Science', 'Engineering', 'Environment', 'Geology', 'Health', 'Mathematics', 'Medicine', 'Nanoscience', 'Neuroscience', 'Physics'];

const article = {
    title: 'By analyzing 25 years of US data, researchers found toxicity of pesticides to nontarget invertebrates, including pollinators, has increased markedly, even though volume used has gone down. This challenges the common assumption that the impacts of environmental pesticides have gone down over time.',
    author: 'ThunderPhD',
    created: 1617736989,
    flair: flairs[Math.floor(Math.random() * 13)],
    src: 'https://source.unsplash.com/140x140/?tech',
    commentNum: Math.floor(Math.random() * 9)
}

const Post = ({ isTrending }) => {
    const title = article.title;
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
            <section className="Post__trending">
                <img className="Post__trending__image" src={article.src += `&sig=${Math.random()}`} alt=""/>
                <div className="Post__trending__content">
                    <h2 className="Post__trending__flair">{article.flair}</h2>
                    <h3 className="Post__trending__title">{shortTitle}</h3>
                </div> 
            </section>
        );
    }
    else {
        return (
            <section className="Post__latest">
                <img className="Post__latest__image" src={article.src += `&sig=${Math.random()}`} alt=""/>
                <div className="Post__latest__content">
                    <p className="Post__latest__flair">{article.flair}</p>
                    <h2 className="Post__latest__title">{longTitle}</h2>
                    <button className="Post__latest__button">Read more <i class="fas fa-angle-double-right Post__latest__icon"></i></button>
                    <p className="Post__latest__detail">
                        <span className="Post__latest__author">Posted by <strong>{article.author}</strong></span>
                        <PostTime time={article.created} />
                        <span className="Post__latest__comments"><i class="far fa-comment-alt"></i> {article.commentNum}</span>
                    </p>
                </div>
            </section> 
        );
    }
}

export default Post;