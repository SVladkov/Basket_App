import axios from 'axios';

const authentication = {
    isAuthenticated: true,
    authenticate(username, password, callback, wrongCredentialsCallback) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/login');
        xhr.withCredentials = true;
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ":" + password));
        xhr.addEventListener('load', (response) => {
            if (xhr.status === 200) {
                this.isAuthenticated = true;
                callback();
            } else if (xhr.status === 400) {
                wrongCredentialsCallback()
            }
        });
        xhr.send();
    },

    signOut(callback, errorCallback) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/logout');
        xhr.withCredentials = true;
        xhr.addEventListener('load', (response) => {
            this.isAuthenticated = false;
            callback();
        });
        xhr.addEventListener('error', (error) => {
            errorCallback();
        })
        xhr.send();
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
