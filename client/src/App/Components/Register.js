import React, { Component } from 'react';
import axios from 'axios';
import Home from './Home';
import authentication from '../authentication';
import {
   Redirect,
   Route,
   Link,
} from 'react-router-dom';

class Register extends React.Component {
    state = {
        redirectToReferrer: false,
        username: '',
        password: '',
        usernameExists: false
    }

    register = () => {
        authentication.register(
            this.state.username,
            this.state.password,
            () => {
                this.setState(() => ({
                    redirectToReferrer: true,
                    usernameExists: false
                }))
            },
            () => {
                this.setState(() => ({
                    usernameExists: true
                }))
            })
    }

    render() {
        const redirectToReferrer = this.state.redirectToReferrer;

        if (redirectToReferrer === true) {
            return (
                <Redirect to='/login' />
            )
        }

        return (
            <div>
                <input value={this.state.username} onChange={event => this.updateUsernameValue(event)} />
                <input type='password' value={this.state.password} onChange={event => this.updatePasswordValue(event)} />
                <button onClick={this.register}>Register</button>
                <p>{ this.state.usernameExists }</p>
                { this.state.usernameExists ? <p>The username already exists. Please change it.</p> : null }
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
export default Register;
