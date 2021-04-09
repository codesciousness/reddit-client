import React from 'react';
import './PostList.css';
import Post from '../post/Post';

const flairs = ['Animal Science', 'Anthropology', 'Astronomy', 'Biology', 'Cancer', 'Chemistry', 'Computer Science', 'Earth Science', 'Economics', 'Engineering', 'Environment', 'Epidemiology', 'Geology', 'Health', 'Mathematics', 'Medicine', 'Nanoscience', 'Neuroscience', 'Paleontology', 'Physics', 'Psychology', 'Social Science'];

const post = {
    id: 1234567,
    title: 'By analyzing 25 years of US data, researchers found toxicity of pesticides to nontarget invertebrates, including pollinators, has increased markedly, even though volume used has gone down. This challenges the common assumption that the impacts of environmental pesticides have gone down over time.',
    author: 'ThunderPhD',
    created: 1617736989,
    flair: flairs[Math.floor(Math.random() * 13)],
    src: 'https://source.unsplash.com/140x140/?tech',
    commentNum: Math.floor(Math.random() * 9),
    comments: [
        {
            id: "gt3gco7",
            author: "Leduckduckgoose",
            body: "No but the cycle is pretty easy to see. And I think people have known it for ages.",
            ups: 2
        },
        {
            id: "gt1bryg",
            author: "ostentatiousbro",
            body: "You have it all figured out.",
            ups: 0
        },
        {
            id: "gt22wft",
            author: "acmilanginger33",
            body: "That makes sense. I didn’t think about the fact that the dead tree becomes it’s own ecosystem.",
            ups: 3
        },
    ]
}

const allPosts = [post, post, post, post, post];

const PostList = ({ isTrending }) => {
    if (isTrending) {
        return (
            <section className="PostList__trending">
                {allPosts.map(post => <Post post={post} isTrending={true} />)}
            </section>
        );
    }
    else {
        return (
            <section className="PostList__latest">
                {allPosts.map(post => <Post post={post} isTrending={false} />)}
            </section> 
        );
    }
}

export default PostList;