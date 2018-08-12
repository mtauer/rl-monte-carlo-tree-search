/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getGameState, getSearchTreeRoot } from './redux';
import { Container, Title } from '../components/Page';
import NextActionsSection from './NextActionsSection';

const PandemicPage = ({ searchTreeRoot }) => (
  <Container>
    <Title>Monte Carlo Tree Search for Pandemic</Title>
    <NextActionsSection gameResult={searchTreeRoot} />
  </Container>
);
PandemicPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  // gameState: PropTypes.object.isRequired,
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
