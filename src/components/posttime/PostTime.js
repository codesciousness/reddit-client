import React from 'react';
import './PostTime.css';

const PostTime = ({ time }) => {
    const currDateTime = new Date(Date.now());
    console.log(Date.now());
    const postDateTime = new Date(time);
    const postMonth = postDateTime.getMonth();
    const postDate = postDateTime.getDate();
    const postYear = postDateTime.getFullYear();
    console.log(postMonth, postDate, postYear);

    
    if (time) {
        return (
            <span className="PostTime__trending">{time} hours ago</span>
        );
    }
}

export default PostTime;