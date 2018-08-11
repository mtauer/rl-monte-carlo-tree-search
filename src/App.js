/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import fromPairs from 'lodash/fromPairs';
import range from 'lodash/range';
import sample from 'lodash/sample';

import * as pandemic from './pandemic';
import initialState from './pandemic/initialState.json';
import { getGameState, getSearchTreeRoot, performGameActionAction } from './monteCarloTreeSearchRedux';
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

const App = ({ gameState, searchTreeRoot, onBoardCellClick }) => {
  const nextActionNodes = searchTreeRoot ? searchTreeRoot.children : [];
  const nextActionsCountMap = fromPairs(
    nextActionNodes.map(n => [n.action.index, n.deepCount]),
  );
  const nextActionsUcb1Map = fromPairs(
    nextActionNodes.map(n => [n.action.index, n.ucb1]),
  );
  let state = initialState;
  let nextAction;
  console.log('Pandemic initial state', state);
  console.log('Pandemic valid actions', pandemic.getValidActions(state));
  nextAction = sample(pandemic.getValidActions(state));
  state = pandemic.performAction(state, nextAction);
  console.log('1 Pandemic next action', nextAction);
  console.log('1 Pandemic next state', state);
  nextAction = sample(pandemic.getValidActions(state));
  state = pandemic.performAction(state, nextAction);
  console.log('2 Pandemic next action', nextAction);
  console.log('2 Pandemic next state', state);
  return (
    <Container>
      <Title>Monte Carlo Tree Search for Connect 4</Title>
      <Section>
        <ConnectFourBoard
          gameState={gameState}
          gameResult={searchTreeRoot}
          onCellClick={onBoardCellClick}
        />
        <Label>Number of simulations per action</Label>
        <ConnectFourBoardAnalysis
          values={range(7).map(i => nextActionsCountMap[i])}
          color="#fca982"
        />
        <Label>
          UCB1 value per action (shows for which action the algorithm will simulate more)
        </Label>
        <ConnectFourBoardAnalysis
          values={range(7).map(i => nextActionsUcb1Map[i])}
          color="#91bfdb"
          formatFunc={f => f.toFixed(3)}
        />
      </Section>
    </Container>
  );
};
App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  gameState: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  searchTreeRoot: PropTypes.object,
  onBoardCellClick: PropTypes.func.isRequired,
};
App.defaultProps = {
  searchTreeRoot: null,
};

const mapStateToProps = state => ({
  gameState: getGameState(state),
  searchTreeRoot: getSearchTreeRoot(state),
});
const mapDispatchToProps = dispatch => ({
  onBoardCellClick: (row, col) => dispatch(performGameActionAction({ index: col })),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
