/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getGameState, getSearchTreeRoot } from './redux';
import PandemicActions from './PandemicActions';
import {
  Container, Title, Section, Label,
} from '../components/Page';

const PandemicPage = ({ gameState, searchTreeRoot }) => {
  console.log('Pandemic initial state', gameState);
  return (
    <Container>
      <Title>Monte Carlo Tree Search for Pandemic</Title>
      <Section>
        <Label>Next actions</Label>
        <PandemicActions
          gameResult={searchTreeRoot}
        />
      </Section>
    </Container>
  );
};
PandemicPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  gameState: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  searchTreeRoot: PropTypes.object,
};
PandemicPage.defaultProps = {
  searchTreeRoot: null,
};

const mapStateToProps = state => ({
  gameState: getGameState(state),
  searchTreeRoot: getSearchTreeRoot(state),
});
export default connect(mapStateToProps)(PandemicPage);
