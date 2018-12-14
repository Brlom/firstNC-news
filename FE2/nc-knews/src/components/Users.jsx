import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';
import ajaxLoader from '../img/ajax-loader.gif';

class Users extends Component {
    state = {
        users: [],
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
            <React.Fragment>
                <h2>Users</h2>
                <ul className="user-scroll">{this.state.users.map(user => {
                    return (
                        <li key={user.user_id}>
                            <img src={user.avatar_url} alt="user avatar" onError={(e) => { e.target.onerror = null; e.target.src = "http://customerservicelife.com/wp-content/uploads/2015/07/pigsfly.jpg" }} height="20" width="20"></img>
                            {" | "}
                            <Link to={`/users/${user.username}`}>{user.username}</Link>
                            {"|"}
                            {user.name}
                        </li>
                    );
                })}
                </ul>
            </React.Fragment>
        );
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        api.getUsers().then(users => {
            this.setState({ users, isLoading: false });
        });
    }
}

export default Users;