import React from 'react';
import ReactDOM from 'react-dom';

import Ranking from './components/Ranking.js';
import Matchday from './components/Matchday.js';

ReactDOM.render(<Ranking season="1718" province="bra" division="3C" highlight="KCVV.Elewijt A" />, document.getElementById('ranking-kcvvelewijt-a'));
ReactDOM.render(<Ranking season="1718" province="bra" division="4D" highlight="KCVV.Elewijt B" />, document.getElementById('ranking-kcvvelewijt-b'));
ReactDOM.render(<Matchday season="1718" province="bra" division="3C" regnumber="00055" />, document.getElementById('matchday-kcvvelewijt-a'));
ReactDOM.render(<Matchday season="1718" province="bra" division="4D" regnumber="00055" />, document.getElementById('matchday-kcvvelewijt-b'));