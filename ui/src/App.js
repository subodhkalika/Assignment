import React, { Component } from 'react';
import './App.css';
import { Leads } from './containers/Leads';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Leads></Leads>
      </div>
    );
  }
}

export default App;
