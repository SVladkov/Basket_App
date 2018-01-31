import React from 'react';
import {
    withRouter
} from 'react-router-dom'
import authentication from '../authentication';

const SignOutButton = withRouter(({ history }) => (
    authentication.isAuthenticated === true
        ? <p>
            <button onClick={() => {
                authentication.signOut(() => history.push('/'))
            }}>Sign out</button>
        </p>
        : <p> You are not logged in. </p>
))

class MyProfile extends React.Component {
    state = {
        name: '',
        newName: ''
    }

    getName() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:5000/profile');
        xhr.withCredentials = true;
        xhr.addEventListener('load', (response) => {
            if (xhr.status === 200) {
                this.setState(() => ({
                    name: xhr.response
                }))
            } else if (xhr.status === 401) {
                authentication.isAuthenticated = false;
                this.setState(() => ({
                    redirectToLogin: true
                }))
            }
        });
        xhr.send();
    }

    setName = () => {
        var newName = this.state.newName;

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/profile');
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        xhr.withCredentials = true;
        xhr.addEventListener('load', (response) => {
            if (xhr.status === 200) {
                this.setState(() => ({
                    name: xhr.response
                }))
            } else if (xhr.status === 401) {
                authentication.isAuthenticated = false;
            }
        });
        var body = JSON.stringify({ name: newName });
        console.log(body);
        xhr.send(body);
    }

    componentDidMount() {
        this.getName();
    }

    render() {
        return (<div>
            <h3>My Profile: {this.state.name}</h3>
            <label>Change name:</label>
            <input value={this.state.newName} onChange={event => this.updateNewNameValue(event)}></input>
            <button onClick={this.setName}>Update</button>
            <SignOutButton />
        </div>)
    }

    updateNewNameValue(event) {
        this.setState({
            newName: event.target.value
        });
    }
}

export default MyProfile;
