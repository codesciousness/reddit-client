import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Posts.css';
import { selectSearchTerm } from '../searchTerm/searchTermSlice';
import { selectFilter } from '../filter/filterSlice';

const Posts = () => {
    const searchTerm = useSelector(selectSearchTerm);
    const filter = useSelector(selectFilter);
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch();
    }
    return (
        <section className="Posts">
            
        </section>
    );
}

export default Posts;