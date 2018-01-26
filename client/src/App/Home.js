import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
    getScores() {
        axios.get('http://127.0.0.1:5000/yesterday-matches').then((response) => {
            console.log(response)
        });
    }

    render() {
        return (
            <div>
                <h2>Home</h2>
                <button onClick={() => this.getScores()}>Get scores</button>
            </div>
        );
   }
}
export default Home;