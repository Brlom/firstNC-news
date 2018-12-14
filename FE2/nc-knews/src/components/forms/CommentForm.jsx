import React, { Component } from 'react';
import * as api from '../../api';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentBody: "",
            article_id: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Comment:
                    <textarea name="commentBody" value={this.state.commentBody} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });
    }
    handleSubmit(event) {
        event.preventDefault();
        api.submitCommentByArticleId(this.state.commentBody, this.props.article_id, this.props.user.user_id)
            .then(comment => {
                this.setState({ commentBody: '' });
                this.props.commentAdded(comment)
            })
    }
}

export default CommentForm;