export const E = '.';
export const X = 'X';
export const O = 'O';

const initialState = {
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
    .map((v, i) => v === E ? { index: i } : null)
    .filter(i => Boolean(i));
}

export default {
  getValidActions,
  initialState,
}
