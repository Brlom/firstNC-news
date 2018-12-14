import React, { Component } from 'react';
import * as api from '../api';
import ArticleSummary from '../components/ArticleSummary';

import ajaxLoader from '../img/ajax-loader.gif';

class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            isLoading: true,
            sort_by: "votes",
            sort_ascending_value: "descending",
            sort_ascending: false,
            dirty: false
        }
        this.handleSortOrder = this.handleSortOrder.bind(this);
        this.handleSortBy = this.handleSortBy.bind(this);
    }

    render() {
        if (this.state.isLoading || !this.state.articles.length) {
            return (
                <React.Fragment key="article">
                    <img id="loading" src={ajaxLoader} alt="ajax loader circle" height="100" width="100" />
                </React.Fragment>
            )
        } else {
            return (
                <div className="articles" >
                    <h2 id="article-title">Articles</h2>
                    <select value={this.state.sort_ascending_value} onChange={this.handleSortOrder}>
                        <option value="ascending">Sort Ascending</option>
                        <option value="descending">Sort Descending</option>
                    </select>
                    <select value={this.state.sort_by} onChange={this.handleSortBy}>
                        <option value="author">Author</option>
                        <option value="votes">Votes</option>
                        <option value="created_at">Date</option>
                    </select>
                    <ul className="article-scroll">{[].concat(this.state.articles).sort((a, b) => b.votes - a.votes).map((article, index) => {
                        return (
                            <React.Fragment key={index}>
                                <ArticleSummary article={article} user={this.props.user} />
                                <hr />
                            </React.Fragment>
                        );
                    })}
                    </ul>
                </div>
            );
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        api.getArticles(`?sort_by=${this.state.sort_by}&sort_ascending=${this.state.sort_ascending}`).then(articles => {
            this.setState({ articles, isLoading: false });
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.dirty) {
            api.getArticles(`?sort_by=${this.state.sort_by}&sort_ascending=${this.state.sort_ascending}`).then(articles => {
                this.setState({ articles: articles, isLoading: false });
            });
            this.setState({ isLoading: true, dirty: false });
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

export default Articles;
