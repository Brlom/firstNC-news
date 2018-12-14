import React, { Component } from 'react';
import * as api from '../api'
import ArticleSummary from './ArticleSummary';
import ajaxLoader from '../img/ajax-loader.gif';

class TopicArticles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            sort_by: "votes",
            sort_ascending_value: "descending",
            sort_ascending: false,
            dirty: false
        }
        this.handleSortOrder = this.handleSortOrder.bind(this);
        this.handleSortBy = this.handleSortBy.bind(this);
    }
    render() {
        if (this.state.articles.length !== 0) {
            return (
                <React.Fragment key="topicArticles">
                    <h3>
                        {this.state.articles.topic ? this.state.articles.topic : 'Articles by topic'}
                    </h3>
                    <select value={this.state.sort_ascending_value} onChange={this.handleSortOrder}>
                        <option value="ascending">Sort Ascending</option>
                        <option value="descending">Sort Descending</option>
                    </select>
                    <select value={this.state.sort_by} onChange={this.handleSortBy}>
                        <option value="author">Author</option>
                        <option value="votes">Votes</option>
                        <option value="created_at">Date</option>
                    </select>
                    <ul className="topicArticle-scroll">
                        {[].concat(this.state.articles.articles).sort((a, b) => b.votes - a.votes).map((article, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <ArticleSummary article={article} user={this.props.user} />
                                    <hr></hr>
                                </React.Fragment>
                            )
                        })}
                    </ul>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment key="article">
                    <img id="loading" src={ajaxLoader} alt="ajax loader circle" height="100" width="100" />
                </React.Fragment>
            )
        }
    }
    componentDidMount() {
        const { topic } = this.props;
        api.getArticlesByTopic(topic, `?sort_by=${this.state.sort_by}&sort_ascending=${this.state.sort_ascending}`).then(articles => {
            this.setState({
                articles: articles
            });
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            const { topic } = this.props;
            api.getArticlesByTopic(topic, `?sort_by=${this.state.sort_by}&sort_ascending=${this.state.sort_ascending}`).then(articles => {
                this.setState({ articles: articles });
            });
            this.setState({ dirty: false });
        }
    }
    handleSortOrder(event) {
        if (event.target.value === "ascending") {
            this.setState({ sort_ascending: true, sort_ascending_value: "ascending", dirty: true })
        } else {
            this.setState({ sort_ascending: false, sort_ascending_value: "descending", dirty: true })
        }
    }
    handleSortBy(event) {
        this.setState({ sort_by: event.target.value, dirty: true })
    }
}

export default TopicArticles;