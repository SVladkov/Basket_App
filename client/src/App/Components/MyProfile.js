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
        fetch('http://localhost:5000/profile', {
            method: 'GET',
            credentials: 'include'
        }).then(response => {
            if (response.status === 200) {
                response.json().then(name => {
                    this.setState(() => ({
                        name: name
                    }))
                })
            } else if (response.status === 401) {
                authentication.isAuthenticated = false;
                this.setState(() => ({
                    redirectToLogin: true
                }))
            }
        })
    }

    setName = () => {
        var newName = this.state.newName;

        fetch('http://localhost:5000/profile', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({ name: newName })
        }).then(response => {
            if (response.status === 200) {
                response.json().then(name => {
                    this.setState(() => ({
                        name: name,
                        newName: ''
                    }))
                })
            } else if (response.status === 401) {
                authentication.isAuthenticated = false;
            }
        })
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
