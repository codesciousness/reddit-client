import React from 'react';
//import logo from './logo.svg';
import './App.css';
import FilterList from '../components/filterList/FilterList';
import SearchTerm from '../features/searchTerm/SearchTerm';
import Posts from '../features/posts/Posts';
import PostDetail from '../components/postDetail/PostDetail';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <nav className="App__navbar">
          <i className="fas fa-home App__navbar__icon"></i>
          <h1 className="App__title">Reddit Science</h1>
        </nav>
        <h2 className="App__subtitle">Your Daily Dose of Science</h2>
        <FilterList />
      </header>
      <SearchTerm />
      <section className="App__trending">
        <div className="App__divider__container">
          <hr />
          <div className="App__divider">Trending</div>
        </div>
        <Posts isTrending={true} />
      </section>
      <section className="App__latest">
        <div className="App__divider__container">
          <hr />
          <div className="App__divider">Latest</div>
        </div>
        <Posts isTrending={false} />
        <PostDetail />
      </section>
    </div>
  );
}

export default App;