import React from 'react';
import {
    Redirect,
    Link,
} from 'react-router-dom';
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
            {
                onStatus200: () => {
                    this.setState(() => ({
                        redirectToReferrer: true,
                        incorrectCredentials: false
                    }))
                },
                onStatus400: () => {
                    console.log('Already logged in')
                },
                onStatus401: () => {
                    authentication.isAuthenticated = false;
                    this.setState(() => ({
                        incorrectCredentials: true
                    }))
                }
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
            <div className="login-register-form">
                <input value={this.state.username} onChange={event => this.updateUsernameValue(event)} />
                <input type='password' value={this.state.password} onChange={event => this.updatePasswordValue(event)} />
                <button onClick={this.login}>Login</button>
                { this.state.incorrectCredentials ? <p className="center">Incorrect username or password.</p> : null }
                <p className="center">You don't have a profile? <Link to='/register'>Register</Link> now!</p>
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
