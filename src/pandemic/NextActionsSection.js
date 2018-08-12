/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getSearchTreeRoot, performGameActionAction } from './redux';
import { Section, Label, Row } from '../components/Page';
import BarChart from './BarChart';
import NextActions from './NextActions';

const BarChartContainer = styled.div`
  margin-right: 16px;
`;
const NextActionsContainer = styled.div`
  flex: 1;
`;

const NextActionsSection = ({ gameResult, onActionClick }) => {
  const nextActionNodes = gameResult ? gameResult.children : [];
  const ucb1Values = nextActionNodes.map(n => n.ucb1);
  const deepCountValues = nextActionNodes.map(n => n.deepCount);
  return (
    <Section>
      <Label>Next actions (with UCB1 value and simulation count per action)</Label>
      <Row>
        <BarChartContainer>
          <BarChart
            values={ucb1Values}
            color="#91bfdb"
            offset={-1}
            formatFunc={f => f.toFixed(3)}
          />
        </BarChartContainer>
        <BarChartContainer>
          <BarChart
            values={deepCountValues}
            color="#fca982"
          />
        </BarChartContainer>
        <NextActionsContainer>
          <NextActions
            gameResult={gameResult}
            onActionClick={onActionClick}
          />
        </NextActionsContainer>
      </Row>
    </Section>
  );
};
NextActionsSection.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  gameResult: PropTypes.object,
  onActionClick: PropTypes.func,
};
NextActionsSection.defaultProps = {
  gameResult: null,
  onActionClick: () => {},
};

const mapStateToProps = state => ({
  gameResult: getSearchTreeRoot(state),
});
const mapDispatchToProps = dispatch => ({
  onActionClick: action => dispatch(performGameActionAction({ action })),
});
export default connect(mapStateToProps, mapDispatchToProps)(NextActionsSection);
