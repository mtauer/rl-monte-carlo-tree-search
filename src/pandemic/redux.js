import { interval, empty } from 'rxjs';
import { filter, switchMap, map, startWith } from 'rxjs/operators';
import cloneDeep from 'lodash/cloneDeep';
import maxBy from 'lodash/maxBy';

import initialGameState from './initialState.json';

import * as pandemic from '.';
import monteCarloTreeSearchND from '../monteCarloTreeSearchND';

const initialState = {
  gameState: initialGameState,
  searchTreeRoot: null,
  isSimulationActive: false,
  isAutoPlayActive: false,
  autoPlayStartTime: 0,
  gameNumber: 0,
  gameMoves: [],
};

const PREFIX = 'pandemic/';
export const SET_SEARCH_TREE_ROOT = `${PREFIX}SET_SEARCH_TREE_ROOT`;
export const PERFORM_GAME_ACTION = `${PREFIX}PERFORM_GAME_ACTION`;
export const SET_SIMULATION_ACTIVE = `${PREFIX}SET_SIMULATION_ACTIVE`;
export const SET_AUTO_PLAY_ACTIVE = `${PREFIX}SET_AUTO_PLAY_ACTIVE`;
export const SET_AUTO_PLAY_START_TIME = `${PREFIX}SET_AUTO_PLAY_START_TIME`;
export const AUTO_PLAY_NEW_GAME = `${PREFIX}AUTO_PLAY_NEW_GAME`;

export function setSearchTreeRootAction(searchTreeRoot) {
  return { type: SET_SEARCH_TREE_ROOT, searchTreeRoot };
}

export function performGameActionAction(gameAction) {
  return { type: PERFORM_GAME_ACTION, gameAction };
}

export function setSimulationActiveAction(isActive) {
  return { type: SET_SIMULATION_ACTIVE, isActive };
}

export function setAutoPlayActiveAction(isActive) {
  return { type: SET_AUTO_PLAY_ACTIVE, isActive };
}

export function setAutoPlayStartTime() {
  return { type: SET_AUTO_PLAY_START_TIME };
}

export function autoPlayNewGameAction() {
  return { type: AUTO_PLAY_NEW_GAME };
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
      const { gameState, gameNumber } = state;
      const { gameAction } = action;
      const newGameState = pandemic.performAction(gameState, gameAction);
      const winner = pandemic.getWinner(newGameState);
      if (winner) {
        console.log('+++ Winner:', winner);
      }
      const newGameMoves = { gameNumber, gameAction, winner };
      // TODO Investigate if and how monteCarloTreeSearchPerformAction could be
      // used for non-deterministic MDPs.
      const newSearchTreeRoot = null;
      return {
        ...state,
        gameState: newGameState,
        searchTreeRoot: newSearchTreeRoot,
        autoPlayStartTime: performance.now(),
        gameMoves: [...state.gameMoves, newGameMoves],
      };
    }
    case SET_SIMULATION_ACTIVE: {
      const { isActive } = action;
      return {
        ...state,
        isSimulationActive: isActive,
        isAutoPlayActive: isActive ? false : state.isAutoPlayActive,
      };
    }
    case SET_AUTO_PLAY_ACTIVE: {
      const { isActive } = action;
      return {
        ...state,
        isSimulationActive: isActive ? false : state.isSimulationActive,
        isAutoPlayActive: isActive,
      };
    }
    case SET_AUTO_PLAY_START_TIME: {
      return {
        ...state,
        autoPlayStartTime: performance.now(),
      };
    }
    case AUTO_PLAY_NEW_GAME: {
      console.log(JSON.stringify(state.gameMoves, null, 2));
      return {
        ...state,
        gameNumber: state.gameNumber + 1,
        autoPlayStartTime: performance.now(),
        gameState: initialState.gameState,
        searchTreeRoot: initialState.searchTreeRoot,
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

export function getIsSimulationActive(state) {
  return state.pandemic.isSimulationActive;
}

export function getIsAutoPlayActive(state) {
  return state.pandemic.isAutoPlayActive;
}

export function getAutoPlayStartTime(state) {
  return state.pandemic.autoPlayStartTime;
}

export function simulatePandemicEpic(action$, state$) {
  return action$.pipe(
    filter(action => action.type === SET_SIMULATION_ACTIVE || action.type === SET_AUTO_PLAY_ACTIVE),
    switchMap(() => {
      const isActive = getIsSimulationActive(state$.value);
      if (isActive) {
        return interval(150).pipe(
          map(() => {
            const gameState = getGameState(state$.value);
            if (pandemic.isFinished(gameState)) {
              return setSimulationActiveAction(false);
            }
            const searchTreeRoot = getSearchTreeRoot(state$.value);
            const root = monteCarloTreeSearchND(pandemic, gameState, searchTreeRoot);
            return setSearchTreeRootAction(cloneDeep(root));
          }),
        );
      }
      return empty();
    }),
  );
}

export function autoPlayPandemicEpic(action$, state$) {
  return action$.pipe(
    filter(action => action.type === SET_SIMULATION_ACTIVE || action.type === SET_AUTO_PLAY_ACTIVE),
    switchMap(() => {
      const isActive = getIsAutoPlayActive(state$.value);
      if (isActive) {
        return interval(150).pipe(
          map(() => {
            const startTime = getAutoPlayStartTime(state$.value);
            const time = performance.now();
            const searchTreeRoot = getSearchTreeRoot(state$.value);
            const gameState = getGameState(state$.value);
            if (pandemic.isFinished(gameState)) {
              return autoPlayNewGameAction();
            }
            if (time > startTime + 60 * 1000) {
              const nextActionNode = maxBy(searchTreeRoot.children, c => c.deepValue / c.deepCount);
              return performGameActionAction(nextActionNode.action);
            }
            const root = monteCarloTreeSearchND(pandemic, gameState, searchTreeRoot);
            return setSearchTreeRootAction(cloneDeep(root));
          }),
          startWith(setAutoPlayStartTime()),
        );
      }
      return empty();
    }),
  );
}
