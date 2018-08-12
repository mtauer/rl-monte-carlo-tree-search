import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import cloneDeep from 'lodash/cloneDeep';

import initialGameState from './initialState.json';

import * as pandemic from '.';
import monteCarloTreeSearch from '../monteCarloTreeSearch';

const initialState = {
  gameState: initialGameState,
  searchTreeRoot: monteCarloTreeSearch(pandemic, initialGameState),
};

const PREFIX = 'pandemic/';
export const SET_SEARCH_TREE_ROOT = `${PREFIX}SET_SEARCH_TREE_ROOT`;

export function setSearchTreeRootAction(searchTreeRoot) {
  return { type: SET_SEARCH_TREE_ROOT, searchTreeRoot };
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
