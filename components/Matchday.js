import React from 'react';

const {Option} = require("option-monad");

class MatchdayRow extends React.Component {
    constructor(props) {
        super(props);

        this.statuses = {
            PP: 'Uitgesteld',
            ST: 'Stopgezet',
            AMC: 'Algemeen Forfait',
            F1: 'Forfait',
            FI: 'Forfait',
            F2: 'Forfait beide ploegen',
            FF: 'Forfait beige ploegen'
        };
    }

    render() {
        let homeLogo = "http://localhost:9000/logo/" + this.props.result.regNumberHome;
        let awayLogo = "http://localhost:9000/logo/" + this.props.result.regNumberAway;

        let moment = require('moment');
        moment.locale('nl-BE');

        let d = new moment( this.props.result.dateTime );
        let timestamp = d.format("dddd D MMMM YYYY HH:mm");

        return (
            <tr className={(this.props.result.regNumberHome === this.props.regnumber || this.props.result.regNumberAway === this.props.regnumber) ? 'highlight' : null}>
                <td>{timestamp}</td>
                <td><img src={homeLogo} ref={homeLogo => this.homeLogo = homeLogo} onError={() => this.homeLogo.src = 'build/images/default.png' }alt={this.props.result.home} /></td>
                <td>{this.props.result.home}</td>
                <td>
                {
                    // If there are results, display them
                    (typeof this.props.result.resultHome !== 'undefined' && typeof this.props.result.resultAway !== 'undefined') ? 
                    this.props.result.resultHome + ' - ' + this.props.result.resultAway: 
                    'vs'
                }</td>
                <td>{this.props.result.away}</td>
                <td><img src={awayLogo} ref={awayLogo => this.awayLogo = awayLogo} onError={() => this.awayLogo.src = 'build/images/default.png' } alt={this.props.result.away} /></td>
                <td>{Option(this.statuses[this.props.result.status]).getOrElse("")}</td>
            </tr>
        )
    }
}

class Matchday extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true
        };
    }

    componentDidMount() {

        fetch("http://localhost:9000/seasons/" + this.props.season + "/regions/" + this.props.province + "/matches/" + this.props.division + "/team/" + this.props.regnumber, {
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(json => this.setState({data: json, loading: false}));
    }

    render() {
        if (this.state.loading === false && this.state.data) {
            this.state.data.sort((a, b) => a.dateTime > b.dateTime)

            return (
                <table cellPadding="0" cellSpacing="0">
                    <thead>
                    <tr>
                        <th>Datum</th>
                        <th colSpan="2">Thuisploeg</th>
                        <th>vs</th>
                        <th colSpan="2">Uitploeg</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.map((result, i) => (<MatchdayRow result={result} regnumber={this.props.regnumber} key={i}/>))
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

export default Matchday;
