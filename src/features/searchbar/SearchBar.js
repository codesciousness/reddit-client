import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
    return (
        <form className="SearchBar">
            <input className="SearchBar__input" placeholder="Search..." />
            <i className="fas fa-search SearchBar__icon"></i>
        </form>
    );
}

export default SearchBar;