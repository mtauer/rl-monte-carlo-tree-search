/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { Component } from 'react';

import * as connectFour from './connectFour';
import './App.css';

class App extends Component {
  render() {
    const validActions = connectFour.getValidActions();
    console.log('validActions', validActions);
    return (
      <h1>Monte Carlo Tree Search for Connect Four</h1>
    );
  }
}

export default App;
