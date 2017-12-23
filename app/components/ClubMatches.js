import React from 'react';

const { Option } = require("option-monad");
const Config = require("Config");

class ClubMatchesRow extends React.Component {
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
        let { result } = this.props;

        let moment = require('moment');
        moment.locale('nl-BE');

        let d = new moment(result.dateTime);
        let dateTime = d.format("dddd D MMMM YYYY [om] HH:mm");

        let division = this.mapDivision(result.division);
        let divisionString = this.outputDivision(division, result.region);

        return (
            <tr className='matchoverviewRow'>
                <td className='matchoverviewRow-Date'>{dateTime}</td>
                <td className='matchoverviewRow-Division'>{divisionString}</td>
                <td className='matchoverviewRow-Team matchoverviewRow-Team--Home'>{result.home}</td>
                <td className='matchoverviewRow-Score'>
                    {
                        // If there are results, display them
                        (typeof result.resultHome !== 'undefined' && typeof result.resultAway !== 'undefined') ?
                            result.resultHome + ' - ' + result.resultAway :
                            'vs'
                    }</td>
                <td className='matchoverviewRow-Team matchoverviewRow-Team--Away'>{result.away}</td>
                <td className='matchoverviewRow-Status'>{Option(this.statuses[result.status]).getOrElse("")}</td>
            </tr>
        )
    }

    mapDivision(division) {
        return /^(\d+)([a-zA-Z]+)(\d*)$/.exec(division);
    }

    outputDivision(divisionArray, level) {
        level = level || '';
        if (divisionArray[1] <= 4) {
            return `${divisionArray[1]}e ${(level !== 'nat') ? 'Provinciale' : 'Nationale'} ${divisionArray[2]}`;
        } else {
            return `U${divisionArray[1]} reeks ${divisionArray[2]}${divisionArray[3] ? ` / ${divisionArray[3]}` : ''}`
        }
    }
}

class ClubMatches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true
        };

        this.baseUrl = Config.serverUrl;
        this.refreshRate = Config.refreshRate;
        this.timeout = {};
    }

    updateData() {
        let { season, action, regnumber } = this.props;

        console.log('Fetching matches overview');

        fetch(this.baseUrl + "/seasons/" + season + "/matches/" + action + "/" + regnumber, {
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(json => this.setState({ data: json, loading: false }));

        this.timeout = setInterval(() => {
            this.updateData(() => {
                console.log('Updating the rankings.');
            });
        }, this.refreshRate);
    }

    componentDidMount() {
        this.updateData();
    }

    componentWillUnmount() {
        clearInterval(this.timeout);
    }

    render() {
        if (this.state.loading === false && this.state.data) {
            this.state.data.sort((a, b) => a.dateTime > b.dateTime)

            return (
                <table className='matchoverviewTable'>
                    <thead>
                        <tr className='matchoverviewRow'>
                            <th className='matchoverviewRow-Date'>Datum</th>
                            <th className='matchoverviewRow-Division'>Ploeg</th>
                            <th className='matchoverviewRow-Team matchoverviewRow-Team--Home'>Thuisploeg</th>
                            <th className='matchoverviewRow-Score'>vs</th>
                            <th className='matchoverviewRow-Team matchoverviewRow-Team--Away'>Uitploeg</th>
                            <th className='matchoverviewRow-Status'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map((result, i) => (<ClubMatchesRow result={result} key={i} />))
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

export default ClubMatches;
