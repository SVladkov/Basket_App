import React, { Component } from 'react';
import {
   BrowserRouter as Router,
   Route,
   Link
} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import PrivateRoute from './Components/PrivateRoute';
import MyProfile from './Components/MyProfile';
import '../index.css'
import authentication from './authentication';

class App extends Component {
    constructor(props) {
        super(props);
        authentication.authenticateSession();
    }

   render() {
      return (
         <Router>
            <div>
               <h2>Basketball App</h2>
               <ul>
                  <li className="navigation"><Link to='/home'>Home</Link></li>
                  <li className="navigation"><Link to='/my-profile'>My Profile</Link></li>
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
