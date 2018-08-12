import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fromPairs from 'lodash/fromPairs';
import range from 'lodash/range';

import { getGameState, getSearchTreeRoot, performGameActionAction } from './redux';
import ConnectFourBoard from './ConnectFourBoard';
import ConnectFourBoardAnalysis from './ConnectFourBoardAnalysis';
import {
  Container, Section, Title, Label,
} from '../components/Page';

const ConnectFourPage = ({ gameState, searchTreeRoot, onBoardCellClick }) => {
  const nextActionNodes = searchTreeRoot ? searchTreeRoot.children : [];
  const nextActionsCountMap = fromPairs(
    nextActionNodes.map(n => [n.action.index, n.deepCount]),
  );
  const nextActionsUcb1Map = fromPairs(
    nextActionNodes.map(n => [n.action.index, n.ucb1]),
  );
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
ConnectFourPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  gameState: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  searchTreeRoot: PropTypes.object,
  onBoardCellClick: PropTypes.func.isRequired,
};
ConnectFourPage.defaultProps = {
  searchTreeRoot: null,
};

const mapStateToProps = state => ({
  gameState: getGameState(state),
  searchTreeRoot: getSearchTreeRoot(state),
});
const mapDispatchToProps = dispatch => ({
  onBoardCellClick: (row, col) => dispatch(performGameActionAction({ index: col })),
});
export default connect(mapStateToProps, mapDispatchToProps)(ConnectFourPage);
