import React from 'react';
import authentication from '../authentication';
import {
   Redirect
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
            {
                onStatus200: () => {
                    this.setState(() => ({
                        redirectToReferrer: true,
                        usernameExists: false
                    }))
                },
                onStatus409: () => {
                    this.setState(() => ({
                        usernameExists: true
                    }))
                }
            }
        )
    }

    render() {
        const redirectToReferrer = this.state.redirectToReferrer;

        if (redirectToReferrer === true) {
            return (
                <Redirect to='/login' />
            )
        }

        return (
            <div className="login-register-form">
                <input value={this.state.username} onChange={event => this.updateUsernameValue(event)} />
                <input type='password' value={this.state.password} onChange={event => this.updatePasswordValue(event)} />
                <button onClick={this.register}>Register</button>
                <p>{ this.state.usernameExists }</p>
                { this.state.usernameExists ? <p className="center">The username already exists. Please change it.</p> : null }
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
