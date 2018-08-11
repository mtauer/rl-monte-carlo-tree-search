import fromPairs from 'lodash/fromPairs';
import toPairs from 'lodash/toPairs';
import shuffle from 'lodash/shuffle';
import slice from 'lodash/slice';
import chunk from 'lodash/chunk';
import flatten from 'lodash/flatten';
import range from 'lodash/range';
import includes from 'lodash/includes';
import groupBy from 'lodash/groupBy';
import keys from 'lodash/keys';

import {
  diseases, locations, routes, outbreaks,
} from './constants';

const DRIVE_FERRY = 'DRIVE_FERRY';
const DIRECT_FLIGHT = 'DIRECT_FLIGHT';
const CHARTER_FLIGHT = 'CHARTER_FLIGHT';
const SHUTTLE_FLIGHT = 'SHUTTLE_FLIGHT';
const BUILD_RESEARCH_CENTER = 'BUILD_RESEARCH_CENTER';
const DISCOVER_CURE = 'DISCOVER_CURE';
const TREAT_DISEASE = 'TREAT_DISEASE';
const SHARE_KNOWLEDGE = 'SHARE_KNOWLEDGE';

const PLAYERS = 'PLAYERS';
const BOARD = 'BOARD';

export const locationsMap = getLocationsMap();
export const players = getPlayers();
export const initialState = prepareState();

function prepareState() {
  let state = {};
  state = prepareResources(state);
  state = preparePlayerCards(state);
  state = prepareInfectionCards(state);
  state = prepareFirstInfections(state);
  return state;
}

function getLocationsMap() {
  const locationIdsByName = fromPairs(locations.map(l => [l.name, l.id]));
  const locationsById = fromPairs(locations.map(l => [l.id, {
    ...l,
    connectedLocations: [],
  }]));
  routes.forEach(([name1, name2]) => {
    const location1 = locationsById[locationIdsByName[name1]];
    const location2 = locationsById[locationIdsByName[name2]];
    location1.connectedLocations.push(location2.id);
    location2.connectedLocations.push(location1.id);
  });
  return locationsById;
}

function getPlayers() {
  return range(2).map(i => ({ id: i }));
}

function prepareResources(state) {
  // Position all players and a research center in Atlanta
  return {
    ...state,
    playerPosition: fromPairs(players.map(p => [p.id, 3])),
    researchCenters: [3],
    research: {},
    currentPlayer: players[0].id,
    currentMovesCount: 4,
    outbreaksCount: 0,
  };
}

function preparePlayerCards(state) {
  // Shuffle the location player cards
  let cards = shuffle(locations.map(l => l.id));
  // Give 2 players 4 cards each, 3 player 3 cards or 4 players 2 cards
  const cardsPerPlayer = 4;
  const playerCards = fromPairs(players.map((p, i) => [
    p.id,
    slice(cards, i * cardsPerPlayer, (i + 1) * cardsPerPlayer),
  ]));
  cards = slice(cards, players.length * cardsPerPlayer);
  // Shuffle the outpreak cards into the location player cards
  // Note: location ids and outbreaks ids as union are unique
  const cardStacks = chunk(cards, Math.ceil(cards.length / 4));
  outbreaks.forEach((outbreak, i) => {
    if (cardStacks[i]) { cardStacks[i].push(outbreak.id); }
  });
  cards = flatten(cardStacks.map(stack => shuffle(stack)));
  return {
    ...state,
    unplayedPlayerCards: cards,
    playerCards,
    insufficientPlayerCards: false,
  };
}

function prepareInfectionCards(state) {
  // Shuffle the infection cards
  const cards = shuffle(locations.map(l => l.id));
  return {
    ...state,
    unplayedInfectionCards: cards,
  };
}

function prepareFirstInfections(state) {
  const { unplayedInfectionCards } = state;
  const infections = {};
  const usedCubes = fromPairs(diseases.map(d => [d, 0]));
  // Infect 3 locations with 3 cubes
  const highInfections = slice(unplayedInfectionCards, 0, 3);
  highInfections.forEach((id) => {
    const { disease } = locationsMap[id];
    infections[id] = { [disease]: 3 };
    usedCubes[disease] += 3;
  });
  // Infect 3 locations with 2 cubes
  const normalInfections = slice(unplayedInfectionCards, 3, 6);
  normalInfections.forEach((id) => {
    const { disease } = locationsMap[id];
    infections[id] = { [disease]: 2 };
    usedCubes[disease] += 2;
  });
  // Infect 3 locations with 1 cubes
  const lowInfections = slice(unplayedInfectionCards, 6, 9);
  lowInfections.forEach((id) => {
    const { disease } = locationsMap[id];
    infections[id] = { [disease]: 1 };
    usedCubes[disease] += 1;
  });
  return {
    ...state,
    infections,
    usedCubes,
    insufficientCubes: false,
    playedInfectionCards: slice(unplayedInfectionCards, 0, 9),
    unplayedInfectionCards: slice(unplayedInfectionCards, 9),
  };
}

export function getValidActions(state = initialState) {
  const {
    currentPlayer, playerPosition, playerCards, researchCenters, infections,
  } = state;
  const location = locationsMap[playerPosition[currentPlayer]];
  const cards = playerCards[currentPlayer];
  const actions = [];
  // DRIVE_FERRY
  actions.push(location.connectedLocations.map(id => ({ type: DRIVE_FERRY, to: id })));
  // DIRECT_FLIGHT
  actions.push(cards.map(id => ({ type: DIRECT_FLIGHT, to: id })));
  // CHARTER_FLIGHT
  if (includes(cards, location.id)) {
    actions.push(
      locations
        .filter(l => l.id !== location.id)
        .map(l => ({ type: CHARTER_FLIGHT, to: l.id })),
    );
  }
  // SHUTTLE_FLIGHT
  if (researchCenters.length > 1 && includes(researchCenters, location.id)) {
    actions.push(
      researchCenters
        .filter(rc => rc !== location.id)
        .map(rc => ({ type: SHUTTLE_FLIGHT, to: rc })),
    );
  }
  // BUILD_RESEARCH_CENTER
  if (includes(cards, location.id)) {
    actions.push({ type: BUILD_RESEARCH_CENTER, at: location.id });
  }
  // DISCOVER_CURE
  const cardsByDisease = groupBy(cards, (c => locationsMap[c].disease));
  actions.push(
    toPairs(cardsByDisease)
      .filter(pair => pair[1].length >= 5)
      .map(pair => ({ type: DISCOVER_CURE, disease: pair[0] })),
  );
  // TREAT_DISEASE
  if (infections[location.id]) {
    actions.push(
      keys(infections[location.id])
        .map(disease => ({ type: TREAT_DISEASE, disease })),
    );
  }
  // SHARE_KNOWLEDGE
  const playersOnLocation = toPairs(playerPosition)
    .filter(pair => pair[1] === location.id)
    .map(pair => Number(pair[0]));
  if (playersOnLocation.length > 1) {
    const others = playersOnLocation.filter(id => id !== currentPlayer);
    if (includes(cards, location.id)) {
      actions.push(others.map(id => ({
        type: SHARE_KNOWLEDGE,
        card: location.id,
        from: currentPlayer,
        to: id,
      })));
    } else {
      others.forEach((id) => {
        if (includes(playerCards[id], location.id)) {
          actions.push({
            type: SHARE_KNOWLEDGE,
            card: location.id,
            from: id,
            to: currentPlayer,
          });
        }
      });
    }
  }
  return flatten(actions);
}

export function performAction(state = initialState, action) {
  const {
    currentMovesCount, currentPlayer, playerCards, playerPosition,
  } = state;
  const cards = playerCards[currentPlayer];
  const position = playerPosition[currentPlayer];
  switch (action.type) {
    case DRIVE_FERRY: {
      const { to } = action;
      return {
        ...state,
        currentMovesCount: currentMovesCount - 1,
        playerPosition: {
          ...state.playerPosition,
          [currentPlayer]: to,
        },
      };
    }
    case DIRECT_FLIGHT: {
      const { to } = action;
      return {
        ...state,
        currentMovesCount: currentMovesCount - 1,
        playerPosition: {
          ...state.playerPosition,
          [currentPlayer]: to,
        },
        playerCards: {
          ...state.playerCards,
          [currentPlayer]: cards.filter(id => id !== to),
        },
      };
    }
    case CHARTER_FLIGHT: {
      const { to } = action;
      return {
        ...state,
        currentMovesCount: currentMovesCount - 1,
        playerPosition: {
          ...state.playerPosition,
          [currentPlayer]: to,
        },
        playerCards: {
          ...state.playerCards,
          [currentPlayer]: cards.filter(id => id !== position),
        },
      };
    }
    case SHUTTLE_FLIGHT: {
      const { to } = action;
      return {
        ...state,
        currentMovesCount: currentMovesCount - 1,
        playerPosition: {
          ...state.playerPosition,
          [currentPlayer]: to,
        },
      };
    }
    default:
      return state;
  }
}

export function getValue(state = initialState, timePenalty = 0) {
  const winner = getWinner(state);
  switch (winner) {
    case PLAYERS: return 1;
    case BOARD: return -1;
    default: return timePenalty;
  }
}

export function getWinner(state = initialState) {
  const {
    research, insufficientCubes, insufficientPlayerCards, outbreaksCount,
  } = state;
  if (keys(research).length === 4) {
    return PLAYERS;
  }
  if (insufficientCubes || insufficientPlayerCards || outbreaksCount >= 8) {
    return BOARD;
  }
  return null;
}
