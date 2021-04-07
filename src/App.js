import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Filters from './features/filters/Filters';
import SearchBar from './features/searchbar/SearchBar';
import PostList from './components/postlist/PostList';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <h1 className="App__title">Reddit Science</h1>
        <Filters />
      </header>
      <SearchBar />
      <section className="App__trending">
        <div className="divider__container">
          <hr />
          <div className="section__divider">Trending</div>
        </div>
        <PostList isTrending={true} />
      </section>
      <section className="App__latest">
        <div className="divider__container">
          <hr />
          <div className="section__divider">Latest</div>
        </div>
        <PostList isTrending={false} />
      </section>
    </div>
  );
}

export default App;