import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Filter.css';
import { setFilter, clearFilter, selectFilter } from './filterSlice';

const Filter = ({ flair }) => {
    let filter = useSelector(selectFilter);
    const dispatch = useDispatch();
    const flairId = flair.replace(' ', '');
    const handleClick = ({ target }) => {
        if (filter === flair) {
            dispatch(clearFilter());
        }
        else {
            dispatch(setFilter(target.id));
        }
    }
    return (
        <button id={flairId} className={filter === flair ? "Filter__button__active" : "Filter__button"} onClick={handleClick}>{flair}</button>
    );
}

export default Filter;