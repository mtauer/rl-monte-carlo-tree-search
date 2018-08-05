/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { scaleLinear } from 'd3-scale';
import { rgb } from 'd3-color';
import { interpolateHcl } from 'd3-interpolate';

const Board = styled.div`
  display: grid;
  font-size: ${({ size }) => (size === 'small' ? '16px' : '24px')};
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-auto-rows: ${({ size }) => (size === 'small' ? '20px' : '50px')};
  grid-gap: 1px;
  justify-items: stretch;
  margin: 0 48px 0 0;
  padding: 0 0 32px 0;
  width: ${({ size }) => (size === 'small' ? '140px' : '350px')};
`;
const Cell = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  text-align: center;
`;
const CellLabel = styled.div`
  display: block;
  flex: 1;
`;

const ConnectFourBoard = ({
  gameState,
  gameResult,
  size,
}) => {
  const values = gameResult.children.map(n => n.deepValue / n.deepCount);
  return (
    <Board size={size}>
      { gameState.board.map((row, i) => row.map((v, j) => {
        const cellBgColor = getCellBgColor(values[j]);
        return (
          <Cell
            key={`connect-four-cell-${i}-${j}`}
            style={{ backgroundColor: cellBgColor }}
          >
            <CellLabel>
              {v}
            </CellLabel>
          </Cell>
        );
      }))}
    </Board>
  );
};
ConnectFourBoard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  gameState: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  gameResult: PropTypes.object.isRequired,
  size: PropTypes.string,
};
ConnectFourBoard.defaultProps = {
  size: '',
};

function getCellBgColor(value) {
  if (!value) { return null; }

  const valueColor = scaleLinear().domain([-1.0, 0.0, 1.0])
    .interpolate(interpolateHcl)
    .range([rgb('#a50026'), rgb('#ffffff'), rgb('#1a9850')]);
  return valueColor(value);
}

export default ConnectFourBoard;
