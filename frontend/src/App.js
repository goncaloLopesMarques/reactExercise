import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './Post.js';
import Categories from './Categories.js';
import PostList from './PostList.js';
import Edit from './Edit.js';
import View from './View.js';
import NewPost from './NewPost.js';
import PostByCategory from './PostByCategory.js';
import { BrowserRouter, Route, Link } from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: [],
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1 className="title">react-redux project</h1>
          <img  src={logo} className="App-logo" alt="logo" />
        </header>
        <body className="App-body">
        <BrowserRouter>
          <div className="col-md-12">
            <Route path="/"     component={PostList} exact/>
            <Route path="/edit/:id" component={Edit} exact/>
            <Route path="/view/:id" component={View} exact/>
            <Route path="/newPost" component={NewPost} exact/>
            <Route path="/postByCategory/:category" component={PostByCategory} exact/>
          </div>
        </BrowserRouter>
        </body>
      </div>
    );
  }
}

export default App;
