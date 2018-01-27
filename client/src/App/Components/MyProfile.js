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
    render() {
        return (<div>
            <h3>My Profile</h3>
            <SignOutButton />
        </div>)
    }
}

export default MyProfile;
