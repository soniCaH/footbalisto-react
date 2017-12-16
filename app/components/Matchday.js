import React from 'react';

const {Option} = require("option-monad");
const Config = require("Config");

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
        let {result, regnumber} = this.props;

        let homeLogo = Config.serverUrl + "/logo/" + result.regNumberHome;
        let awayLogo = Config.serverUrl + "/logo/" + result.regNumberAway;

        let moment = require('moment');
        moment.locale('nl-BE');

        let d = new moment( result.dateTime );
        let timestamp = d.format("dddd D MMMM YYYY HH:mm");

        return (
            <tr className={(result.regNumberHome === regnumber || result.regNumberAway === regnumber) ? 'highlight' : null}>
                <td>{timestamp}</td>
                <td><img src={homeLogo} ref={homeLogo => this.homeLogo = homeLogo} onError={() => this.homeLogo.src = 'images/default.png' }alt={result.home} /></td>
                <td>{result.home}</td>
                <td>
                {
                    // If there are results, display them
                    (typeof result.resultHome !== 'undefined' && typeof result.resultAway !== 'undefined') ? 
                    result.resultHome + ' - ' + result.resultAway: 
                    'vs'
                }</td>
                <td>{result.away}</td>
                <td><img src={awayLogo} ref={awayLogo => this.awayLogo = awayLogo} onError={() => this.awayLogo.src = 'images/default.png' } alt={result.away} /></td>
                <td>{Option(this.statuses[result.status]).getOrElse("")}</td>
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
        let {season, province, division, regnumber} = this.props;

        fetch(Config.serverUrl + "/seasons/" + season + "/regions/" + province + "/matches/" + division + "/team/" + regnumber, {
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