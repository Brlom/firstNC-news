import React from 'react';
import Login from '../forms/Login';
import Header from './Header';
import Footer from '../base_comp/Footer';

const Auth = props => {
    if (props.user) {
        return (
            <React.Fragment>
                {props.children}
            </React.Fragment>
        );
    } else {
        return (
            <div className="main">
                <Header user={props.user} />
                <Login setUser={props.setUser} />
                <Footer className="footer" />
            </div>
        )
    }

};

export default Auth;
