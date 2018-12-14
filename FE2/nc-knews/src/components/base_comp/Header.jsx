import React from 'react';
import { Link } from '@reach/router';

const Header = ({ user }) => (
    <div className="header">
        < header className="App-header" >
            <img src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_second.png" alt="North coders news logo" width="250" height="75"></img>
            <h1>NorthCoders</h1>
            <h1>News</h1>
            <nav className="nav">
                <Link to="/">Home</Link>
                {" | "}
                <Link to="/topics">Topics</Link>
                {" | "}
                <Link to="/articles">Articles</Link>
                {" | "}
                <Link to="/articles/submit">Submit Article</Link>
                {" | "}
                <Link to="/users">Users</Link>
                <h5>Logged in as: {user.username}</h5>
            </nav>
        </header >
    </div>

)

export default Header;