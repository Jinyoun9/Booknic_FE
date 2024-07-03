import React from 'react';
import '../css/SearchBar.css';

const SearchBar = () => {
    return (
        <div className="search-bar">
            <input type="text" placeholder="통합검색" />
        </div>
    );
};

export default SearchBar;