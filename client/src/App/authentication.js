import axios from 'axios';

const fakeAuth = {
   isAuthenticated: false,
   authenticate(username, password, callback) {
        axios.post('http://127.0.0.1:5000/login', {}, {
                auth: {
                    username: username,
                    password: password
                }
            }).then((response) => {
                console.log(response);
                this.isAuthenticated = true;
                callback();
            })
   },
   signOut(callback) {
      this.isAuthenticated = false;
      setTimeout(callback, 100);
   }
}

export default fakeAuth
