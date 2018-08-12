/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import fromPairs from 'lodash/fromPairs';

const PandemicActions = ({ gameResult }) => {
  const nextActionNodes = gameResult ? gameResult.children : [];
  const nextActions = nextActionNodes.map(n => n.action);
  const nextActionValuesMap = fromPairs(
    nextActionNodes.map((n, i) => [i, n.deepValue / n.deepCount]),
  );
  console.log('nextActions', nextActions, nextActionValuesMap);
  return (
    <p>PandemicActions</p>
  );
};
PandemicActions.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  gameResult: PropTypes.object,
};
PandemicActions.defaultProps = {
  gameResult: null,
};

export default PandemicActions;
