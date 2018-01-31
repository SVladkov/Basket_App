import React from 'react';

class MatchData extends React.Component {
    render() {
        var match = this.props.match

        return (<tr>
            <td className="logo"><img className="logo" src={match.first_team.logo} alt="" /></td>
            <td className="">{match.first_team.name}</td>
            <td>{match.first_team.score}</td>
            <td>:</td>
            <td>{match.second_team.score}</td>
            <td className="">{match.second_team.name}</td>
            <td className="logo"><img className="logo" src={match.second_team.logo} alt="" /></td>
        </tr>)
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: null,
            noMatchesData: false
        }
    }

    getScores() {
        fetch('http://127.0.0.1:5000/yesterday-matches', {
            method: 'GET'
        }).then(response => {
            if (response.status === 200) {
                response.json().then(matches => {
                    this.setState(() => ({
                        matches: matches
                    }))
                })
            } else if (response.status === 204) {
                this.setState(() => ({
                    noMatchesData: true
                }))
            }
        })
    }

    componentDidMount() {
        this.getScores();
    }

    render() {
        var rows = [];
        if (this.state.matches !== null) {
            for (var match of this.state.matches) {
                rows.push(<MatchData match={match} />);
            }

            return <div><table><tbody className="center">{rows}</tbody></table></div>
        } else if (this.state.noMatchesData) {
            return <h2 className="center">Could not load any matches data.</h2>
        } else {
            return <h2 className="center">Loading scores...</h2>
        }
   }
}
export default Home;
