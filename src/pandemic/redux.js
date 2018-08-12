import { interval, empty } from 'rxjs';
import { filter, switchMap, map } from 'rxjs/operators';
import cloneDeep from 'lodash/cloneDeep';

import initialGameState from './initialState.json';

import * as pandemic from '.';
import monteCarloTreeSearch from '../monteCarloTreeSearch';

const initialState = {
  gameState: initialGameState,
  searchTreeRoot: null,
  isSimulationActive: false,
};

const PREFIX = 'pandemic/';
export const SET_SEARCH_TREE_ROOT = `${PREFIX}SET_SEARCH_TREE_ROOT`;
export const PERFORM_GAME_ACTION = `${PREFIX}PERFORM_GAME_ACTION`;
export const SET_SIMULATION_ACTIVE = `${PREFIX}SET_SIMULATION_ACTIVE`;

export function setSearchTreeRootAction(searchTreeRoot) {
  return { type: SET_SEARCH_TREE_ROOT, searchTreeRoot };
}

export function performGameActionAction(gameAction) {
  return { type: PERFORM_GAME_ACTION, gameAction };
}

export function setSimulationActiveAction(isActive) {
  return { type: SET_SIMULATION_ACTIVE, isActive };
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
    case SET_SIMULATION_ACTIVE: {
      const { isActive } = action;
      return {
        ...state,
        isSimulationActive: isActive,
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

export function getIsSimulationAction(state) {
  return state.pandemic.isSimulationActive;
}

export function simulatePandemicEpic(action$, state$) {
  return action$.pipe(
    filter(action => action.type === SET_SIMULATION_ACTIVE),
    switchMap(() => {
      const isActive = getIsSimulationAction(state$.value);
      if (isActive) {
        return interval(150).pipe(
          map(() => {
            const gameState = getGameState(state$.value);
            const searchTreeRoot = getSearchTreeRoot(state$.value);
            const root = monteCarloTreeSearch(pandemic, gameState, searchTreeRoot);
            return setSearchTreeRootAction(cloneDeep(root));
          }),
        );
      }
      return empty();
    }),
  );
}
