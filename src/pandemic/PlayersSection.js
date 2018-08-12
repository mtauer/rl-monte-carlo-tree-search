import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import keys from 'lodash/keys';

import { getGameState } from './redux';
import {
  Section, SectionTitle, Row, Label,
} from '../components/Page';
import Location from './Location';

const PlayerContainer = styled.div`
  flex: 1;
`;
const Card = styled.div`
`;

const PlayersSection = ({ players }) => (
  <Section>
    <Row>
      { players.map(player => (
        <PlayerContainer key={player.id}>
          <SectionTitle>Player {player.id}</SectionTitle>
          <Label>Position: <Location locationId={player.position} /></Label>
          <Label>Cards:</Label>
          { player.cards.map(card => (
            <Card key={card}>
              <Location locationId={card} />
            </Card>
          ))}
        </PlayerContainer>
      ))}
    </Row>
  </Section>
);
PlayersSection.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  players: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const gameState = getGameState(state);
  const players = keys(gameState.playerPosition).map(id => ({
    id,
    position: gameState.playerPosition[id],
    cards: gameState.playerCards[id],
  }));
  return {
    players,
  };
};
export default connect(mapStateToProps)(PlayersSection);
