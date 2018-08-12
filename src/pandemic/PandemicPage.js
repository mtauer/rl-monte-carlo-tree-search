/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import {
  Container, Title,
} from '../components/Page';

import * as pandemic from '.';
import initialState from './initialState.json';
import monteCarloTreeSearch from '../monteCarloTreeSearch';

const PandemicPage = () => {
  const state = initialState;
  console.log('Pandemic initial state', state);
  console.log('Pandemic valid actions', pandemic.getValidActions(state));
  const root = monteCarloTreeSearch(pandemic, state);
  console.log('Search tree root', root);
  return (
    <Container>
      <Title>Monte Carlo Tree Search for Pandemic</Title>
    </Container>
  );
};

export default PandemicPage;
