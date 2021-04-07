import React from 'react';
import './PostList.css';
import Post from '../../features/post/Post';

const PostList = ({ isTrending }) => {
    if (isTrending) {
        return (
            <section className="PostList__trending">
                <Post isTrending={true} />
                <Post isTrending={true} />
                <Post isTrending={true} />
                <Post isTrending={true} />
                <Post isTrending={true} />
            </section>
        );
    }
    else {
        return (
            <section className="PostList__latest">
                <Post isTrending={false} />
                <Post isTrending={false} />
                <Post isTrending={false} />
                <Post isTrending={false} />
                <Post isTrending={false} />
            </section> 
        );
    }
}

export default PostList;