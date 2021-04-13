import React from 'react';
import SearchTerm from '../../features/searchTerm/SearchTerm';
import Posts from '../../features/posts/Posts';

const Home = () => {
    return (
        <main>
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
          </section>
        </main>
    );
}

export default Home;