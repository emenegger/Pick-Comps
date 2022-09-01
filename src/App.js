// import React from "react";
import React, {Component} from 'react';
import './App.sass';
import UserInputContainer from './components/UserInputContainer';

import NBAcomparison from './components/NBAcomparison';

class App extends Component {
    constructor() {
      super();
      // Old code, not sure if I need it
    //   this.state = {
    //     userStats: {
    //         gameTo: null,
    //         pts: null,
    //         ast: null,
    //         reb: null,
    //         stl: null,
    //         blk: null,
    //     },
    //     nbaPlayerStats: {
    //         player_id: null,
    //         pts: null,
    //         ast: null,
    //         reb: null,s
    //         stl: null,
    //         blk: null,
    //     }
    //   }
    }
  
    render() {
      return (
        <div className="App">
          <header className="App-header">
            < UserInputContainer state = {this.state} />
          </header>
        </div>
      );
    }
  }

export default App;