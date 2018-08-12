import initialGameState from './initialState.json';

import * as pandemic from '.';
import monteCarloTreeSearch from '../monteCarloTreeSearch';

const initialState = {
  gameState: initialGameState,
  searchTreeRoot: monteCarloTreeSearch(pandemic, initialGameState),
};

export default function pandemicReducer(state = initialState, action) {
  switch (action.type) {
    default: return state;
  }
}

export function getGameState(state) {
  return state.pandemic.gameState;
}

export function getSearchTreeRoot(state) {
  return state.pandemic.searchTreeRoot;
}
