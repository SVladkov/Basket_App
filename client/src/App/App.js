import React, { Component } from 'react';
import {
   BrowserRouter as Router,
   Route,
   Link,
   Redirect
} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import PrivateRoute from './Components/PrivateRoute';
import MyProfile from './Components/MyProfile';

class App extends Component {
   render() {
      return (
         <Router>
            <div>
               <h2>Welcome</h2>
               <ul>
                  <li><Link to='/home'>Home</Link></li>
                  <li><Link to='/my-profile'>My Profile</Link></li>
               </ul>
               <hr />

               <Route path='/home' component={Home} />
               <Route path='/login' component={Login} />
               <Route path='/register' component={Register} />
               <PrivateRoute path='/my-profile' component={MyProfile} />
            </div>
         </Router>
      );
   }
}
export default App;
