import React from 'react';
import './Home.css';
import SearchTerm from '../../features/searchTerm/SearchTerm';
import Posts from '../../features/posts/Posts';

const Home = () => {
  return (
    <main>
      <SearchTerm />
      <section className="Home__trending">
        <div className="Home__divider__container">
          <hr />
          <div className="Home__divider">Trending</div>
        </div>
        <Posts isTrending={true} />
      </section>
      <section className="Home__latest">
        <div className="Home__divider__container">
          <hr />
          <div className="Home__divider">Latest</div>
        </div>
        <Posts isTrending={false} />
      </section>
    </main>
  );
}

export default Home;