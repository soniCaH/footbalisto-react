import React from 'react';

class RankingLister extends React.Component {
    constructor() {
        super();
        this.state = { 
            data: [], 
            loading: true 
        };
    }
    
    componentDidMount() {
        fetch("http://localhost:9000/seasons/1718/regions/bra/rankings/3C", {
            credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(json => this.setState({data: json, loading: false}));
    }
    
    render () {
        if (this.state.loading === false && this.state.data) {
            this.state.data.sort((a, b) => a.position > b.position)

            return (
                <ul>
                {

                    this.state.data.map((result, i) => (
                        <li key={i}>Position {result.position}: {result.team} with {result.points} points</li>)
                    )
                }
                </ul>
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

export default RankingLister;
