import React from 'react';
//import logo from './logo.svg';
import './App.css';
import FilterList from '../components/filterList/FilterList';
import SearchTerm from '../features/searchTerm/SearchTerm';
import PostList from '../components/postList/PostList';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <h1 className="App__title">Reddit Science</h1>
        <h2 className="App__subtitle">Your Daily Dose of Science</h2>
        <FilterList />
      </header>
      <SearchTerm />
      <section className="App__trending">
        <div className="App__divider__container">
          <hr />
          <div className="App__divider">Trending</div>
        </div>
        <PostList isTrending={true} />
      </section>
      <section className="App__latest">
        <div className="App__divider__container">
          <hr />
          <div className="App__divider">Latest</div>
        </div>
        <PostList isTrending={false} />
      </section>
    </div>
  );
}

export default App;