import React from 'react';

class RankingRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <tr className={this.props.result.team === this.props.highlight ? 'highlight' : null}>
                <td>{this.props.result.position}</td>
                <td>{this.props.result.team}</td>
                <td>{this.props.result.matches}</td>
                <td>{this.props.result.wins}</td>
                <td>{this.props.result.draws}</td>
                <td>{this.props.result.losses}</td>
                <td>{this.props.result.goalsPro}</td>
                <td>{this.props.result.goalsAgainst}</td>
                <td>{this.props.result.goalsPro-this.props.result.goalsAgainst}</td>
                <td>{this.props.result.points}</td>
            </tr>
        )
    }
}

class Ranking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true
        };
    }

    componentDidMount() {
        fetch("http://localhost:9000/seasons/" + this.props.season + "/regions/" + this.props.province + "/rankings/" + this.props.division, {
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(json => this.setState({data: json, loading: false}));
    }

    render() {
        if (this.state.loading === false && this.state.data) {
            this.state.data.sort((a, b) => a.position > b.position)

            return (
                <table cellPadding="0" cellSpacing="0">
                    <thead><tr><th>#</th><th>Team</th><th>M</th><th>W</th><th>D</th><th>L</th><th>G-</th><th>G+</th><th>+/-</th><th>Pts</th></tr></thead>
                    <tbody>
                    {
                        this.state.data.map((result, i) => (<RankingRow result={result} key={i} highlight={this.props.highlight}/>))
                    }
                    </tbody>
                </table>
            )

        } else {
            return (
                <div>
                    Loading...
                </div>
            )
        }

    }
}

export default Ranking;
