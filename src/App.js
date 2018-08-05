/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import * as connectFour from './connectFour';
import monteCarloTreeSearch from './monteCarloTreeSearch';
import { getInitialGameState } from './monteCarloTreeSearchRedux';
import ConnectFourBoard from './ConnectFourBoard';
import ConnectFourBoardAnalysis from './ConnectFourBoardAnalysis';
import './App.css';

const Container = styled.div`
  background-color: #ffffff;
  margin: 0 auto;
  max-width: 800px;
  min-height: 100vh;
  padding: 32px 48px;
`;
const Section = styled.div`
  padding: 0 0 32px 0;
`;
const Title = styled.h1`
  font-family: 'IBM Plex Sans', sans-serif;
  margin: 0;
  padding: 0 0 16px 0;
`;
const Label = styled.label`
  display: block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  padding: 0 0 8px 0;
`;

const App = ({ initialGameState }) => {
  const result = monteCarloTreeSearch(connectFour, initialGameState);
  return (
    <Container>
      <Title>Monte Carlo Tree Search for Connect 4</Title>
      <Section>
        <ConnectFourBoard
          gameState={initialGameState}
          gameResult={result}
        />
        <Label>Number of simulations per action</Label>
        <ConnectFourBoardAnalysis
          values={result.children.map(n => n.deepCount)}
          color="#fca982"
        />
        <Label>UCB1 value per action (shows how likely futher simulations for an action are)</Label>
        <ConnectFourBoardAnalysis
          values={result.children.map(n => n.ucb1)}
          color="#91bfdb"
          formatFunc={f => f.toFixed(3)}
        />
      </Section>
    </Container>
  );
};
App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  initialGameState: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  initialGameState: getInitialGameState(state),
});
export default connect(mapStateToProps)(App);
