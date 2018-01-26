import React, { Component } from 'react';
import axios from 'axios';
import Home from './Home';
import fakeAuth from '../authentication';
import {
   Redirect
} from 'react-router-dom';

class Login extends React.Component {
   state = {
      redirectToReferrer: false,
      username: '',
      password: ''
   }

   login = () => {
      fakeAuth.authenticate(this.state.username, this.state.password, () => {
         this.setState(() => ({
            redirectToReferrer: true
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
