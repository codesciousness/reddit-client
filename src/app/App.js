import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import FilterList from '../components/filterList/FilterList';
import Home from '../components/home/Home';
import PostDetail from '../components/postDetail/PostDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App__header">
          <nav className="App__navbar">
            <Link to='/'><i className="fas fa-home App__navbar__icon"></i></Link>
            <Link to='/'><h1 className="App__title">Reddit Science</h1></Link>
          </nav>
          <h2 className="App__subtitle">Your Daily Dose of Science</h2>
          <FilterList />
        </header>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/posts/:flair/:id' component={PostDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;