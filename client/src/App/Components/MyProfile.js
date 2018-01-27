import React from 'react';
import axios from 'axios';
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
        axios.get('http://127.0.0.1:5000/profile')
            .then((response) => {
                this.setState(() => ({
                    name: response.data
                }));
            })
    }

    setName = () => {
        var newName = this.state.newName;
        axios.post('http://127.0.0.1:5000/profile', {name: newName})
            .then((response) => {
                this.setState(() => ({
                    name: newName,
                    newName: ''
                }));
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
