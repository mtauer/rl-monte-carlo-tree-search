import fromPairs from 'lodash/fromPairs';
import shuffle from 'lodash/shuffle';
import slice from 'lodash/slice';
import chunk from 'lodash/chunk';
import flatten from 'lodash/flatten';

import {
  diseases, locations, routes, outbreaks,
} from './constants';

export const locationsMap = getLocationsMap();
export const initialState = {
  board: prepareBoard(),
};

export function prepareBoard() {
  let board = {
    players: [{ id: 0 }, { id: 1 }],
  };
  // TODO prepare resources (players, research centers, research status)
  board = preparePlayerCards(board);
  board = prepareInfectionCards(board);
  // TODO prepare first infections
  return board;
}

function getLocationsMap() {
  const locationIdsByName = fromPairs(locations.map(l => [l.name, l.id]));
  const locationsById = fromPairs(locations.map(l => [l.id, {
    ...l,
    connectedLocations: [],
    cubes: fromPairs(diseases.map(d => [d, 0])),
  }]));
  routes.forEach(([name1, name2]) => {
    const location1 = locationsById[locationIdsByName[name1]];
    const location2 = locationsById[locationIdsByName[name2]];
    location1.connectedLocations.push(location2.id);
    location2.connectedLocations.push(location1.id);
  });

  return locationsById;
}

function preparePlayerCards(board) {
  // Shuffle the location player cards
  let cards = shuffle(locations.map(l => l.id));
  // Give 2 players 4 cards each, 3 player 3 cards or 4 players 2 cards
  const cardsPerPlayer = 4;
  const players = board.players.map((p, i) => ({
    ...p,
    playerCards: slice(cards, i * cardsPerPlayer, (i + 1) * cardsPerPlayer),
  }));
  cards = slice(cards, players.length * cardsPerPlayer);
  // Shuffle the outpreak cards into the location player cards
  // Note: location ids and outbreaks ids as union are unique
  const cardStacks = chunk(cards, Math.ceil(cards.length / 4));
  outbreaks.forEach((outbreak, i) => {
    if (cardStacks[i]) { cardStacks[i].push(outbreak.id); }
  });
  cards = flatten(cardStacks.map(stack => shuffle(stack)));
  return {
    ...board,
    unplayedPlayerCards: cards,
    players,
  };
}

function prepareInfectionCards(board) {
  // Shuffle the infection cards
  const cards = shuffle(locations.map(l => l.id));
  return {
    ...board,
    unplayedInfectionCards: cards,
  };
}
