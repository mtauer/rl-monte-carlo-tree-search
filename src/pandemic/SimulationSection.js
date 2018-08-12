import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getIsSimulationAction, setSimulationActiveAction } from './redux';

import {
  Section, SectionTitle, Row, Column, Button,
} from '../components/Page';

const ButtonSpacing = styled.div`
  padding: 0 8px 8px 0;
`;

const SimulationSection = ({ isActive, onStartClick, onStopClick }) => (
  <Section>
    <Row>
      <Column>
        <SectionTitle>Simulation</SectionTitle>
        <Row>
          <ButtonSpacing>
            <Button onClick={onStartClick} disabled={isActive}>Start</Button>
          </ButtonSpacing>
          <ButtonSpacing>
            <Button onClick={onStopClick} disabled={!isActive}>Stop</Button>
          </ButtonSpacing>
        </Row>
      </Column>
    </Row>
  </Section>
);
SimulationSection.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onStartClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isActive: getIsSimulationAction(state),
});
const mapDispatchToProps = dispatch => ({
  onStartClick: () => dispatch(setSimulationActiveAction(true)),
  onStopClick: () => dispatch(setSimulationActiveAction(false)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SimulationSection);
