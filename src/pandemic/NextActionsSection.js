/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Section, Label, Row } from '../components/Page';
import BarChart from './BarChart';
import NextActions from './NextActions';

const BarChartContainer = styled.div`
  margin-right: 16px;
`;
const NextActionsContainer = styled.div`
  flex: 1;
`;

const NextActionsSection = ({ gameResult }) => {
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
          />
        </NextActionsContainer>
      </Row>
    </Section>
  );
};
NextActionsSection.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  gameResult: PropTypes.object,
};
NextActionsSection.defaultProps = {
  gameResult: null,
};

export default NextActionsSection;
