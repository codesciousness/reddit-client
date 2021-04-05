import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Filters from './features/filters/Filters';
import SearchBar from './features/searchbar/SearchBar';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <h1 className="App__title">Reddit Science</h1>
        <Filters />
      </header>
      <SearchBar />
    </div>
  );
}

export default App;