import React, { Component } from 'react';
import {
    Redirect,
    Route,
    Link,
} from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import Register from './Register';
import authentication from '../authentication';

class Login extends React.Component {
    state = {
        redirectToReferrer: false,
        username: '',
        password: '',
        incorrectCredentials: false
    }

    login = () => {
        authentication.authenticate(
            this.state.username,
            this.state.password,
            () => {
                this.setState(() => ({
                    redirectToReferrer: true,
                    incorrectCredentials: false
                }))
            },
            () => {
                this.setState(() => ({
                    incorrectCredentials: true
                }))
            })
    }

    render() {
        const redirectToReferrer = this.state.redirectToReferrer;
        const { from } = this.props.location.state || { from: { pathname: '/' } }

        if (redirectToReferrer === true) {
            return (
                <Redirect to={from} />
            )
        }

        return (
            <div>
                <p>You must login to view this page at {from.pathname}</p>
                <input value={this.state.username} onChange={event => this.updateUsernameValue(event)} />
                <input type='password' value={this.state.password} onChange={event => this.updatePasswordValue(event)} />
                <button onClick={this.login}>Login</button>
                { this.state.incorrectCredentials ? <p>Incorrect username or password.</p> : null }
                <p>You don't have a profile? <Link to='/register'>Register</Link> now!</p>
            </div>
        )
    }

    updateUsernameValue(event) {
        this.setState({
            username: event.target.value
        });
    }

    updatePasswordValue(event) {
        this.setState({
            password: event.target.value
        });
    }
}
export default Login;
