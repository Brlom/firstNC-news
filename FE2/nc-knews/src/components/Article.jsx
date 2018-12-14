import React, { Component } from 'react';
import * as api from '../api';
import CommentForm from './forms/CommentForm';
import Comment from './Comment';
import { navigate } from '@reach/router';
import ajaxLoader from '../img/ajax-loader.gif';

class Article extends Component {
    state = {
        article: {},
        comments: [],
        isLoading: true
    }
    render() {
        if (this.state.isLoading) {
            return (
                <React.Fragment key="article">
                    <img id="loading" src={ajaxLoader} alt="ajax loader circle" height="100" width="100" />
                </React.Fragment>
            );
        }
        return (
            <React.Fragment key="article">
                <h2 id="article-title">Article</h2>
                <ul className="article-scroll">
                    <span>
                        <b>
                            {this.state.article.title ? this.state.article.title : "articleTitle"}
                        </b> {" | "}
                        <button className="deleteButton" onClick={this.handleDelete.bind(this, this.state.article.article_id)}>🗑</button>
                    </span>
                    <p>{this.state.article.body}</p>
                    <hr />
                    <CommentForm user={this.props.user} article_id={this.state.article.article_id} commentAdded={this.commentAdded} />
                    <hr />
                    {this.state.comments.map(comment => {
                        return (
                            <Comment comment={comment} article_id={this.state.article.article_id} />
                        )
                    })}
                </ul>
            </React.Fragment>
        )
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        const { article_id } = this.props;
        api.getArticleById(article_id).then(article => {
            this.setState({
                article: article, isLoading: false
            });
        });
        api.getCommentsByArticleId(article_id).then(comments => {
            this.setState({ isLoading: true })
            this.setState({
                comments: comments, isLoading: false
            });
        });
    }
    commentAdded = (comment) => {
        comment.author = this.props.user.username;
        const joined = [comment].concat(this.state.comments);
        this.setState({ comments: joined })
    }

    handleDelete = (article_id) => {
        api.deleteArticle(article_id).then(() => {
            navigate('/articles');
        });
    }
}

export default Article;
