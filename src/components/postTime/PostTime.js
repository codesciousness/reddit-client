import React from 'react';
import './PostTime.css';

const PostTime = ({ time }) => {
    const timeDiff = (curr, prev) => {
        curr = Math.floor(curr / 1000);
        const elapsed = curr - prev;

        const secPerMin = 60;
        const secPerHour = secPerMin * 60;
        const secPerDay = secPerHour * 24;
        const secPerMonth = secPerDay * 30;
        const secPerYear = secPerDay * 365;

        if (elapsed < secPerMin) {
            return Math.floor(elapsed) + ' seconds ago';
        }
    
        else if (elapsed < secPerHour) {
            if (Math.floor(elapsed/secPerMin) === 1) {
                return Math.floor(elapsed/secPerMin) + ' minute ago';
            }
            return Math.floor(elapsed/secPerMin) + ' minutes ago';
        }
    
        else if (elapsed < secPerDay ) {
            if (Math.floor(elapsed/secPerHour) === 1) {
                return Math.floor(elapsed/secPerHour) + ' hour ago';
            }
            return Math.floor(elapsed/secPerHour) + ' hours ago';
        }
    
        else if (elapsed < secPerMonth) {
            if (Math.floor(elapsed/secPerDay) === 1) {
                return Math.floor(elapsed/secPerDay) + ' day ago';
            }
            return Math.floor(elapsed/secPerDay) + ' days ago';
        }
    
        else if (elapsed < secPerYear) {
            if (Math.floor(elapsed/secPerMonth) === 1) {
                return Math.floor(elapsed/secPerMonth) + ' month ago';
            }
            return Math.floor(elapsed/secPerMonth) + ' months ago';
        }
    
        else {
            if (Math.floor(elapsed/secPerYear) === 1) {
                return Math.floor(elapsed/secPerYear) + ' year ago';
            }
            return Math.floor(elapsed/secPerYear) + ' years ago';
        }
    };

    return (
        <span className="PostTime">{timeDiff(Date.now(), time)}</span>
    );
}

export default PostTime;
