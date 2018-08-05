import { E, X } from './connectFour';

const initialState = {
  initialGameState: {
    board: [
      [E, E, E, E, E, E, E],
      [E, E, E, E, E, E, E],
      [E, E, E, E, E, E, E],
      [E, E, E, E, E, E, E],
      [E, E, E, E, E, E, E],
      [E, E, E, E, E, E, E],
    ],
    currentPlayer: X,
  },
};

export default function monteCarloTreeSearchReducer(state = initialState, action) {
  switch (action.type) {
    default: return state;
  }
}

export function getInitialGameState(state) {
  return state.initialGameState;
}
