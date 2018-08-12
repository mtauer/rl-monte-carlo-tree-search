/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import fromPairs from 'lodash/fromPairs';

import { DRIVE_FERRY, DIRECT_FLIGHT, TREAT_DISEASE } from '.';

const Container = styled.div`
  width: 320px;
`;
const Row = styled.div`
  display: flex;
  height: 70px;
`;
const ValueContainer = styled.div`
  align-items: center;
  border-right: 1px solid #ffffff;
  justify-content: center;
  display: flex;
  width: 70px;
`;
const Value = styled.p`
  display: block;
  font-size: 12px;
`;
const ActionContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 12px 8px;
`;
const ActionTitle = styled.p`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 18px;
  margin: 0;
  padding: 0;
`;

const PandemicActions = ({ gameResult }) => {
  const nextActionNodes = gameResult ? gameResult.children : [];
  const nextActions = nextActionNodes.map(n => n.action);
  const nextActionValuesMap = fromPairs(
    nextActionNodes.map((n, i) => [i, n.deepValue / n.deepCount]),
  );
  console.log('nextActions', nextActions, nextActionValuesMap);
  return (
    <Container>
      { nextActions.map((action, i) => {
        const nextActionValue = nextActionValuesMap[i];
        console.log('action', action);
        return (
          <Row key={i}>
            <ValueContainer>
              <Value>{nextActionValue !== undefined ? nextActionValue.toFixed(3) : ''}</Value>
            </ValueContainer>
            <ActionContainer>
              <ActionTitle>
                {formatActionType(action)}
              </ActionTitle>
            </ActionContainer>
          </Row>
        );
      })}
    </Container>
  );
};
PandemicActions.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  gameResult: PropTypes.object,
};
PandemicActions.defaultProps = {
  gameResult: null,
};

function formatActionType(action) {
  switch (action.type) {
    case DRIVE_FERRY: return 'Drive / Ferry';
    case DIRECT_FLIGHT: return 'Direct Flight';
    case TREAT_DISEASE: return 'Treat Disease';
    default: return action.type;
  }
}

export default PandemicActions;
