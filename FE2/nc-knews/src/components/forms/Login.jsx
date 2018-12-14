import React, { Component } from 'react';
import * as api from '../../api';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameValue: '',
            failed: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    render() {
        return (
            <div id="login-form">
                <h3>Please Log In: </h3>
                <form>
                    <label> Username:
                    <input type="text" placeholder="Username" value={this.state.usernameValue} onChange={this.handleChange}></input>
                    </label>
                    <input className="login-submit" onClick={this.handleLogin} type="submit"></input>
                </form>
                <label> Users to choose from:
                    <select>
                        <option value="tickle122">tickle122</option>
                        <option value="grumpy19">grumpy19</option>
                        <option value="happyamy2016">happyamy2016</option>
                        <option value="cooljmessy">cooljmessy</option>
                        <option value="weegembump">weegenbump</option>
                        <option value="jessjelly">jessjelly</option>
                    </select>
                </label>
            </div>
        )
    }
    handleLogin(event) {
        event.preventDefault();
        api.getUserByUsername(this.state.usernameValue).then(user => {
            if (user) {
                this.props.setUser(user)
            } else {
                this.setState({ failed: true })
            }
        })
    }
    handleChange(event) {
        this.setState({ usernameValue: event.target.value })
    }
}

export default Login;