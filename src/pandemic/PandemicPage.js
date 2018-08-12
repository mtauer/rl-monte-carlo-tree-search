import React from 'react';

import { Container, Title } from '../components/Page';
import SimulationSection from './SimulationSection';
import NextActionsSection from './NextActionsSection';
import PlayersSection from './PlayersSection';

const PandemicPage = () => (
  <Container>
    <Title>Monte Carlo Tree Search for Pandemic</Title>
    <SimulationSection />
    <NextActionsSection />
    <PlayersSection />
  </Container>
);

export default PandemicPage;
