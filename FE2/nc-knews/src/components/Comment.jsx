import React, { Component } from 'react';
import * as api from '../api';
import moment from 'moment';
import { Link } from '@reach/router';

class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // article: props.article,
            // comments: {},
            hidden: false
        }
    }

    render() {
        if (this.state.hidden) {
            return null;
        }
        return (
            <div>
                {/* <button className="voteButton upVote" onClick={this.handleUpVote.bind(this, comments.comment_id)}>⬆</button>
                <span className="voteCount">{comments.votes}</span> */}
                {/* <button className="voteButton downVote" onClick={this.handleDownVote.bind(this, comments.comment_id)}>⬇</button> */}
                {/* {" | "} */}
                <span className="commentHeader"><Link to={`/users/${this.props.comment.author}`}>{this.props.comment.author}</Link>{" | "}{moment(this.props.comment.created_at).fromNow()}
                    {" | "}
                    <button className="deleteButton" onClick={this.handleDelete.bind(this)}>🗑</button>
                </span>
                <p className="commentBody">{this.props.comment.body}</p>
            </div>
        );
    }
    // handleUpVote = (comment_id) => {
    //     console.log(comment_id)
    //     api.voteComment(comment_id, 1, article_id).then(() => {
    //         const newComment = this.state.comments;
    //         newComment.votes += 1;
    //         this.setState({ comment: newComment })
    //     })
    // }
    // handleDownVote = (comment_id) => {
    //     api.voteComment(comment_id, -1, article_id).then(() => {
    //         const newComment = this.state.comments;
    //         newComment.votes += -1;
    //         this.setState({ comment: newComment })
    //     })
    // }
    handleDelete() {
        api.deleteComment(this.props.comment.comment_id, this.props.article_id).then(() => {
            this.setState({ hidden: true })
        })
    }
}

export default Comment;