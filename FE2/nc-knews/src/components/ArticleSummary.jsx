import React, { Component } from 'react';
import * as api from '../api';
import { Link, navigate } from '@reach/router';
import moment from 'moment';
import CommentForm from './forms/CommentForm';

class ArticleSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: props.article,
            hidden: false
        }
    }
    render() {
        if (this.state.hidden) {
            return null;
        }
        const { article } = this.state;
        return (
            <li key={article.article_id}>
                <button className="voteButton upVote" onClick={this.handleUpVote.bind(this, article.article_id)}>⬆</button>
                <span className="voteCount">{article.votes}</span>
                <button className="voteButton downVote" onClick={this.handleDownVote.bind(this, article.article_id)}>⬇</button>
                {" | "}
                <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
                {" | "}
                <Link to={`/users/${article.author}`}><img src={article.avatar_url} alt="user avatar" onError={(e) => { e.target.onerror = null; e.target.src = "http://customerservicelife.com/wp-content/uploads/2015/07/pigsfly.jpg" }} height="20" width="20"></img>{article.author}</Link>
                {" | "}
                {moment(article.created_at).fromNow()}
                {" | "}
                <Link to={`/articles/${article.article_id}`}>{article.comment_count} comments</Link>
                {" | "}
                <button className="deleteButton" onClick={this.handleDelete.bind(this, article.article_id)}>🗑</button>
                <br />
                <CommentForm article_id={article.article_id} user={this.props.user} commentAdded={this.commentAdded} />
            </li>
        );
    }
    handleUpVote = (article_id) => {
        api.voteArticle(article_id, 1).then(() => {
            const newArticle = this.state.article;
            newArticle.votes += 1;
            this.setState({ article: newArticle })
        })
    }
    handleDownVote = (article_id) => {
        api.voteArticle(article_id, -1).then(() => {
            const newArticle = this.state.article;
            newArticle.votes += -1;
            this.setState({ article: newArticle })
        })
    }
    commentAdded = () => {
        navigate(`/articles/${this.state.article.article_id}`)
    }
    handleDelete = (article_id) => {
        api.deleteArticle(article_id).then(() => {
            this.setState({ hidden: true });
        });
    }
}

export default ArticleSummary;