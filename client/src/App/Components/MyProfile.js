import React from 'react';
import {
    withRouter
} from 'react-router-dom'
import fakeAuth from '../authentication';

const SignOutButton = withRouter(({ history }) => (
   fakeAuth.isAuthenticated === true
      ? <p>
            Welcome<button onClick={() => {
               fakeAuth.signOut(() => history.push('/'))
            }}>Sign out</button>
         </p>
      : <p> You are not logged in. </p>
))

const MyProfile = () => <div><h3>My Profile</h3><SignOutButton /></div>

export default MyProfile;
