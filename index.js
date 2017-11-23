import React from 'react';
import ReactDOM from 'react-dom';
import RankingLister from './App.js';

//ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<RankingLister season="1718" province="bra" division="3C" highlight="KCVV.Elewijt A" />, document.getElementById('ranking-kcvvelewijt-a'));
ReactDOM.render(<RankingLister season="1718" province="bra" division="4D" highlight="KCVV.Elewijt B" />, document.getElementById('ranking-kcvvelewijt-b'));
