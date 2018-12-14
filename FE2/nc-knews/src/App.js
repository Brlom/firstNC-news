import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Auth from './components/base_comp/Auth';
import Header from './components/base_comp/Header';
import Home from './components/Home';
import Topics from './components/Topics';
import TopicArticles from './components/TopicArticles';
import Articles from './components/Articles';
import Article from './components/Article';
import ArticleForm from './components/forms/ArticleForm';
import CommentForm from './components/forms/CommentForm';
import Users from './components/Users';
import User from './components/User';
// import Errors from './Errors';
import Footer from './components/base_comp/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      topic: ''
    }
    this.state.setUser = this.setUser.bind(this);
    this.state.setTopic = this.setTopic.bind(this);
  }

  render() {
    const { user, topic } = this.state;
    return (
      <div className="App">
        <Auth setUser={this.setUser} user={user}>
          <Header user={user} />
          <Router>
            <Home path="/" />
            <Topics path="/topics" />
            <TopicArticles user={user} topic={topic} path="/topics/:topic/articles" />
            <Articles user={user} path="/articles" />
            <Article user={user} path="/articles/:article_id" />
            <ArticleForm user={user} path="/articles/submit" />
            <CommentForm user={user} path="/articles/:article_id/comments" />
            <Users path="/users" />
            <User path="/users/:username" />
          </Router>
          {/* <Errors path="/error" /> */}
          <Footer className="footer" />
        </Auth>
      </ div>

    );
  }
  setUser = (user) => {
    this.setState({ user })
  }
  setTopic = (topic) => {
    this.setState({ topic })
  }
  setArticle = (article) => {
    this.setState({ article })
  }
}

export default App;
