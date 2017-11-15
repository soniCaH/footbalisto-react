import React from 'react';

class App extends React.Component {
   render() {
      return (
         <div>
            Hey React Do!
         </div>
      );
   }
}

class ItemLister extends React.Component {
    constructor() {
        super();
        this.state = { items: [] };
    }
    
    componentDidMount() {
        fetch(`http://localhost:9000/seasons/1718/regions/bra/rankings/3C`) 
            .then(result=> {
                this.setState({items:result.json()});
            });
    }
    
    render() {        
        return(
            <div>
                <div>Items:</div>
                { this.state.items.map(item=> { return <div>{item.name}</div>}) }          
            </div>  
        );
    }
}

//export default App;
export default ItemLister;

