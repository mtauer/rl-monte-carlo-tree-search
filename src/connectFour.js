import range from 'lodash/range';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';

export const E = '.';
export const X = 'X';
export const O = 'O';

const ROWS_COUNT = 6;
const COLUMNS_COUNT = 7;
const CONNECT_COUNT = 4;
export const initialState = {
  board: [
    [E, E, E, E, E, E, E],
    [E, E, E, E, E, E, E],
    [E, E, E, E, E, E, E],
    [E, E, E, E, E, E, E],
    [E, E, E, E, E, E, E],
    [E, E, E, E, E, E, E],
  ],
  currentPlayer: X,
};

export function getValidActions(state = initialState) {
  return state.board[0]
    .map((v, i) => (v === E ? { index: i } : null))
    .filter(i => Boolean(i));
}

export function performAction(state = initialState, action) {
  const newState = cloneDeep(state);
  const { index } = action;
  for (let row = ROWS_COUNT - 1; row >= 0; row -= 1) {
    if (newState.board[row][index] === E) {
      newState.board[row][index] = newState.currentPlayer;
      return {
        board: newState.board,
        currentPlayer: newState.currentPlayer === X ? O : X,
      };
    }
  }
  return null;
}

export function getValue(state = initialState, timePenalty = 0) {
  const winner = getWinner(state);
  switch (winner) {
    case X: return 1;
    case O: return -1;
    default: return isEmpty(getValidActions(state)) ? -1 : timePenalty;
  }
}

export function isFinished(state = initialState) {
  return Boolean(getWinner(state)) || isEmpty(getValidActions(state));
}

export function getWinner(state = initialState) {
  const lines = [];
  // add horizontal lines
  range(ROWS_COUNT).forEach((row) => {
    lines.push(range(COLUMNS_COUNT).map(col => [row, col]));
  });
  // add vertical lines
  range(COLUMNS_COUNT).forEach((col) => {
    lines.push(range(ROWS_COUNT).map(row => [row, col]));
  });
  // add diagonal lines
  range(COLUMNS_COUNT - 1).forEach((col) => {
    const diff = ROWS_COUNT - CONNECT_COUNT;
    lines.push(range(ROWS_COUNT).map(i => [i, 0 - diff + col + i]));
    lines.push(range(ROWS_COUNT).map(i => [i, COLUMNS_COUNT - 1 + diff - col - i]));
  });
  return getWinnerForLines(state, lines);
}

function getWinnerForLines(state, lines) {
  const { board } = state;
  let winner = null;
  lines.forEach((line) => {
    const connect = {
      player: null,
      count: 0,
      maxPlayer: null,
      maxCount: 0,
    };
    line.forEach((pos) => {
      const row = pos[0];
      const col = pos[1];
      if (row < 0 || row >= ROWS_COUNT || col < 0 || col >= COLUMNS_COUNT) {
        return;
      }
      const value = board[row][col];
      if (value === connect.player) {
        connect.count += 1;
      } else if (value === E) {
        updateMaximum();
        connect.player = null;
        connect.count = 0;
      } else {
        updateMaximum();
        connect.player = value;
        connect.count = 1;
      }
    });
    updateMaximum();
    if (connect.maxCount >= CONNECT_COUNT) {
      winner = connect.maxPlayer;
    }

    function updateMaximum() {
      if (connect.count > connect.maxCount) {
        connect.maxCount = connect.count;
        connect.maxPlayer = connect.player;
      }
    }
  });
  return winner;
}
