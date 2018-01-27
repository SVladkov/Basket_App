import axios from 'axios';

const authentication = {
   isAuthenticated: false,
   authenticate(username, password, callback, errorCallback) {
        axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa(username + ":" + password);

        axios.post('http://127.0.0.1:5000/login').then((response) => {
                this.isAuthenticated = true;
                callback();
            }).catch((error) => {
                if (error.response.status === 400) {
                    errorCallback();
                }
            });
   },
   signOut(callback) {
      this.isAuthenticated = false;
      setTimeout(callback, 100);
   },
   register(username, password, callback, errorCallback) {
        axios.post('http://127.0.0.1:5000/register', {}, {
                auth: {
                    username: username,
                    password: password
                }
            }).then((response) => {
                this.isAuthenticated = true;
                callback();
            }).catch((error) => {
                if (error.response.status === 409) {
                    errorCallback();
                }
            });
   }
}

export default authentication
