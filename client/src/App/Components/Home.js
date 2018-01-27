import React from 'react';
import axios from 'axios';

class MatchData extends React.Component {
    render() {
        var match = this.props.match

        return (<tr>
            <td className="logo"><img className="logo" src={match.first_team.logo}/></td>
            <td className="">{match.first_team.name}</td>
            <td>{match.first_team.score}</td>
            <td>:</td>
            <td>{match.second_team.score}</td>
            <td className="">{match.second_team.name}</td>
            <td className="logo"><img className="logo" src={match.second_team.logo}/></td>
        </tr>)
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: null
        }
    }

    getScores() {
        axios.get('http://127.0.0.1:5000/yesterday-matches')
            .then((response) => {
                this.setState(() => ({
                    matches: response
                }))
            }).catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getScores();
    }

    render() {
        var rows = [];
        if (this.state.matches !== null) {
            for (var match of this.state.matches.data) {
                rows.push(<MatchData match={match} />);
            }

            return <div><table><tbody className="center">{rows}</tbody></table></div>
        }

        return (
            <div>
                <h2 className="center">Loading scores...</h2>
            </div>
        );
   }
}
export default Home;