import React, { Component } from 'react';
import axios from 'axios';
import Home from './Home';
import fakeAuth from '../authentication';
import {
   Redirect
} from 'react-router-dom';

class Login extends React.Component {
   state = {
      redirectToReferrer: false
   }

   login = () => {
      fakeAuth.authenticate(() => {
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
            <button onClick={this.login}>Login</button>
         </div>
      )
   }
}
export default Login;
