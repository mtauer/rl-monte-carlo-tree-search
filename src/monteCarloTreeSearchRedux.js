import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import cloneDeep from 'lodash/cloneDeep';

import * as connectFour from './connectFour';
import monteCarloTreeSearch from './monteCarloTreeSearch';

const { E, X } = connectFour;

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
  searchTreeRoot: null,
};

const PREFIX = 'monteCarloTreeSearch/';
export const SET_SEARCH_TREE_ROOT = `${PREFIX}SET_SEARCH_TREE_ROOT`;

export function setSearchTreeRootAction(searchTreeRoot) {
  return { type: SET_SEARCH_TREE_ROOT, searchTreeRoot };
}

export default function monteCarloTreeSearchReducer(state = initialState, action) {
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

export function getInitialGameState(state) {
  return state.initialGameState;
}

export function getSearchTreeRoot(state) {
  return state.searchTreeRoot;
}

export function monteCarloTreeSearchEpic(action$, state$) {
  return interval(150).pipe(
    map(() => {
      const { initialGameState, searchTreeRoot } = state$.value;
      const root = monteCarloTreeSearch(connectFour, initialGameState, searchTreeRoot);
      return setSearchTreeRootAction(cloneDeep(root));
    }),
  );
}
