import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../api';
import ajaxLoader from '../img/ajax-loader.gif';

class Topics extends Component {
    state = {
        topics: [],
        articles: [],
        isLoading: true
    };
    render() {
        if (this.state.isLoading) {
            return (
                <React.Fragment key="article">
                    <img id="loading" src={ajaxLoader} alt="ajax loader circle" height="100" width="100" />
                </React.Fragment>
            )
        }
        return (
            <React.Fragment key="topics">
                <div id="topics-outer">
                    <div className="table">
                        <h2 id="topics">Topics</h2>
                        <ul id="topics-choice">{this.state.topics.map(topic => {
                            return (
                                <li key={topic.slug}><Link to={`/topics/${topic.slug}/articles`}><h3 className="topicTitle">{topic.slug}</h3></Link><img src={this.getRandomImage()} alt="random"></img></li>
                            )
                        })}
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        );
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        const { topic } = this.props;
        api.getTopics().then(topics => {
            this.setState({ topics: topics, isLoading: false });
        });
        this.setState({ isLoading: true })
        api.getArticlesByTopic(topic).then(articles => {
            this.setState({ articles: articles, isLoading: false })
        })
    }
    getRandomImage = () => {
        const randomInt = Math.floor(Math.random() * 1000);
        return `https://picsum.photos/150/150/?image=${randomInt}`;
    }
}

export default Topics;