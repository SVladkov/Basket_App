const authentication = {
    isAuthenticated: true,
    authenticateSession() {
        fetch('http://localhost:5000/authenticate-session', {
            method: 'GET',
            credentials: 'include'
        }).then(response => {
            if (response.status === 200) {
                this.isAuthenticated = true;
            } else if (response.status === 401) {
                this.isAuthenticated = false;
            }
        });
    },
    authenticate(username, password, callbacks) {
        fetch('http://localhost:5000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Authorization': 'Basic ' + btoa(username + ":" + password)
            }
        }).then(response => {
            if (response.status === 200) {
                this.isAuthenticated = true;
                callbacks.onStatus200();
            } else if (response.status === 401) {
                callbacks.onStatus401();
            } else if (response.status === 400) {
                callbacks.onStatus400();
            }
        });
    },
    signOut(callback, errorCallback) {
        fetch('http://localhost:5000/logout', {
            method: 'POST',
            credentials: 'include',
        }).then(response => {
            this.isAuthenticated = false;
            callback();
        });
    },
    register(username, password, callback, errorCallback) {
        fetch('http://127.0.0.1:5000/register', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(username + ":" + password)
            }
        }).then(response => {
            if (response.status === 200) {
                this.isAuthenticated = true;
                callback.onStatus200();
            } else if (response.status === 409) {
                callback.onStatus409();
            } else if (response.status === 401) {
                callback.onStatus401();
            }
        });
   }
}

export default authentication
