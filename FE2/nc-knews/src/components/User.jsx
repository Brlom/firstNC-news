import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';
import moment from 'moment';
import ajaxLoader from '../img/ajax-loader.gif';

class User extends Component {
    state = {
        user: {},
        articles: [],
        isLoading: true
    }
    render() {
        if (this.state.isLoading) {
            return (
                <React.Fragment key="article">
                    <img id="loading" src={ajaxLoader} alt="ajax loader circle" height="100" width="100" />
                </React.Fragment>
            )
        }
        return (
            <div>
                <ul key="user.user_id">
                    <h3>{this.state.user.username ? this.state.user.username : "Username"}</h3>
                    <React.Fragment>
                        <li><b>Name: </b>{this.state.user.name}</li>
                        <img src={this.state.user.avatar_url} alt="user avatar" onError={(e) => { e.target.onerror = null; e.target.src = "http://customerservicelife.com/wp-content/uploads/2015/07/pigsfly.jpg" }} height="200" width="200"></img>
                    </React.Fragment>
                    <hr></hr>
                    <h4>User Articles:</h4>
                    {this.state.articles.map(article => {
                        return (
                            <li key={article.article_id}>
                                <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
                                {" | "}
                                {moment(article.created_at).fromNow()}
                                )
                                    {" | "}
                                <p>{article.comment_count} comments</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        const { username } = this.props;
        api.getUserByUsername(username).then(user => {
            this.setState({
                user: user, isLoading: false
            });
        });
        api.getArticles().then(articles => {
            this.setState({ isLoading: true })
            const userArticles = articles.filter(article => article.author === username);
            this.setState({
                articles: userArticles, isLoading: false
            })
        })
    }
}

export default User;