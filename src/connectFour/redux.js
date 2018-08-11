import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import cloneDeep from 'lodash/cloneDeep';

import * as connectFour from './connectFour';
import monteCarloTreeSearch, { monteCarloTreeSearchPerformAction } from '../monteCarloTreeSearch';

const { E, X } = connectFour;

const initialState = {
  gameState: {
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
  searchTreeRoot: null,
};

const PREFIX = 'monteCarloTreeSearch/';
export const SET_SEARCH_TREE_ROOT = `${PREFIX}SET_SEARCH_TREE_ROOT`;
export const PERFORM_GAME_ACTION = `${PREFIX}PERFORM_GAME_ACTION`; // with action we mean a game/MDP action

export function setSearchTreeRootAction(searchTreeRoot) {
  return { type: SET_SEARCH_TREE_ROOT, searchTreeRoot };
}

export function performGameActionAction(gameAction) {
  return { type: PERFORM_GAME_ACTION, gameAction };
}

export default function connectFourReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_TREE_ROOT: {
      const { searchTreeRoot } = action;
      return {
        ...state,
        searchTreeRoot,
      };
    }
    case PERFORM_GAME_ACTION: {
      const { gameState, searchTreeRoot } = state;
      const { gameAction } = action;
      const newGameState = connectFour.performAction(gameState, gameAction);
      const newSearchTreeRoot = monteCarloTreeSearchPerformAction(searchTreeRoot, gameAction);
      return {
        ...state,
        gameState: newGameState,
        searchTreeRoot: newSearchTreeRoot,
      };
    }
    default: return state;
  }
}

export function getGameState(state) {
  return state.connectFour.gameState;
}

export function getSearchTreeRoot(state) {
  return state.connectFour.searchTreeRoot;
}

export function simulateConnectFourEpic(action$, state$) {
  return interval(150).pipe(
    map(() => {
      const gameState = getGameState(state$.value);
      const searchTreeRoot = getSearchTreeRoot(state$.value);
      const root = monteCarloTreeSearch(connectFour, gameState, searchTreeRoot);
      return setSearchTreeRootAction(cloneDeep(root));
    }),
  );
}
