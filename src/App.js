/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { Component } from 'react';
import styled from 'styled-components';

import * as connectFour from './connectFour';
import monteCarloTreeSearch from './monteCarloTreeSearch';
import './App.css';

const Container = styled.div`
  background-color: #ffffff;
  margin: 0 auto;
  max-width: 800px;
  min-height: 100vh;
  padding: 32px 48px;
`;
const Title = styled.h1`
  font-family: 'IBM Plex Sans', sans-serif;
  margin: 0;
  padding: 0 0 16px 0;
`;

class App extends Component {
  render() {
    const result = monteCarloTreeSearch(connectFour, connectFour.initialState);
    console.log('result', result);
    return (
      <Container>
        <Title>Monte Carlo Tree Search for Connect Four</Title>
      </Container>
    );
  }
}

export default App;
