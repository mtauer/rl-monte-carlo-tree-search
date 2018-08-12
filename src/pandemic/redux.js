import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import cloneDeep from 'lodash/cloneDeep';

import initialGameState from './initialState.json';

import * as pandemic from '.';
import monteCarloTreeSearch from '../monteCarloTreeSearch';

const initialState = {
  gameState: initialGameState,
  searchTreeRoot: null,
};

const PREFIX = 'pandemic/';
export const SET_SEARCH_TREE_ROOT = `${PREFIX}SET_SEARCH_TREE_ROOT`;
export const PERFORM_GAME_ACTION = `${PREFIX}PERFORM_GAME_ACTION`;

export function setSearchTreeRootAction(searchTreeRoot) {
  return { type: SET_SEARCH_TREE_ROOT, searchTreeRoot };
}

export function performGameActionAction(gameAction) {
  return { type: PERFORM_GAME_ACTION, gameAction };
}

export default function pandemicReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_TREE_ROOT: {
      const { searchTreeRoot } = action;
      return {
        ...state,
        searchTreeRoot,
      };
    }
    case PERFORM_GAME_ACTION: {
      const { gameState } = state;
      const { gameAction } = action;
      const newGameState = pandemic.performAction(gameState, gameAction);
      // TODO Investigate if and how monteCarloTreeSearchPerformAction could be
      // used for non-deterministic MDPs.
      const newSearchTreeRoot = null;
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
  return state.pandemic.gameState;
}

export function getSearchTreeRoot(state) {
  return state.pandemic.searchTreeRoot;
}

export function simulatePandemicEpic(action$, state$) {
  return interval(150).pipe(
    map(() => {
      const gameState = getGameState(state$.value);
      const searchTreeRoot = getSearchTreeRoot(state$.value);
      const root = monteCarloTreeSearch(pandemic, gameState, searchTreeRoot);
      return setSearchTreeRootAction(cloneDeep(root));
    }),
  );
}
