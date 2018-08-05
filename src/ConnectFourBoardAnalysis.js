/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import max from 'lodash/max';

const Chart = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-auto-rows: 70px;
  grid-gap: 1px;
  justify-items: stretch;
  margin: 0 48px 0 0;
  padding: 0 0 32px 0;
  width: 490px;
`;
const Cell = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  text-align: center;
`;
const CellValue = styled.div`
  bottom: 3px;
  font-size: 12px;
  left: 0;
  position: absolute;
  right: 0;
`;
const CellBar = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
`;

const ConnectFourBoardAnalysis = ({
  values,
  color,
  formatFunc,
}) => {
  // const nextActionsCount = gameResult.children.map(n => n.deepCount);
  const maxValue = max(values);
  return (
    <Chart>
      { values.map((v, i) => {
        const barHeight = 70 * v / maxValue;
        return (
          <Cell key={`next-action-bar-${i}`}>
            <CellBar style={{ height: `${barHeight}px`, backgroundColor: color }} />
            <CellValue>
              {formatFunc(v)}
            </CellValue>
          </Cell>
        );
      })}
    </Chart>
  );
};
ConnectFourBoardAnalysis.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  // gameResult: PropTypes.object.isRequired,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string.isRequired,
  formatFunc: PropTypes.func,
};
ConnectFourBoardAnalysis.defaultProps = {
  formatFunc: v => v,
};

export default ConnectFourBoardAnalysis;
