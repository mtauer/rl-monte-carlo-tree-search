import fromPairs from 'lodash/fromPairs';
import shuffle from 'lodash/shuffle';
import slice from 'lodash/slice';
import chunk from 'lodash/chunk';
import flatten from 'lodash/flatten';
import range from 'lodash/range';
import includes from 'lodash/includes';

import {
  diseases, locations, routes, outbreaks,
} from './constants';

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
    playerPositions: fromPairs(players.map(p => [p.id, 3])),
    researchCenters: [3],
    research: {},
    currentPlayer: players[0].id,
    currentMovesCount: 4,
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
    playedInfectionCards: slice(unplayedInfectionCards, 0, 9),
    unplayedInfectionCards: slice(unplayedInfectionCards, 9),
  };
}

export function getValidActions(state = initialState) {
  const {
    currentPlayer, playerPositions, playerCards, researchCenters,
  } = state;
  const location = locationsMap[playerPositions[currentPlayer]];
  const cards = playerCards[currentPlayer];
  const actions = [];
  // Drive/ferry
  actions.push(location.connectedLocations.map(id => ({ type: 'DRIVE_FERRY', to: id })));
  // Direct flights
  actions.push(cards.map(id => ({ type: 'DIRECT_FLIGHT', to: id })));
  // Charter flighs
  if (includes(cards, location.id)) {
    actions.push(
      locations
        .filter(l => l.id !== location.id)
        .map(l => ({ type: 'CHARTER_FLIGHT', to: l.id })),
    );
  }
  // Shuttle flight
  if (researchCenters.length > 1 && includes(researchCenters, location.id)) {
    actions.push(
      researchCenters
        .filter(rc => rc !== location.id)
        .map(rc => ({ type: 'SHUTTLE_FLIGHT', to: rc })),
    );
  }
  return flatten(actions);
}