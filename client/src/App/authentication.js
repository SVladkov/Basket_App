import axios from 'axios';

const authentication = {
    isAuthenticated: true,
    authenticateSession() {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', 'http://localhost:5000/authenticate-session');
        xhr.withCredentials = true;
        xhr.addEventListener('load', (response) => {
            if (xhr.status === 200) {
                this.isAuthenticated = true;
            } else if (xhr.status === 401) {
                this.isAuthenticated = false;
            }
        })

        xhr.send()
    },
    authenticate(username, password, callbacks) {
        var xhr = new XMLHttpRequest();

        xhr.open('POST', 'http://localhost:5000/login');
        xhr.withCredentials = true;
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ":" + password));
        xhr.addEventListener('load', (response) => {
            if (xhr.status === 200) {
                this.isAuthenticated = true;
                callbacks.onStatus200();
            } else if (xhr.status === 401) {
                callbacks.onStatus401();
            } else if (xhr.status === 400) {
                callbacks.onStatus400();
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
