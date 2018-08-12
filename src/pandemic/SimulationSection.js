import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  getIsSimulationActive, getIsAutoPlayActive, setSimulationActiveAction,
  setAutoPlayActiveAction,
} from './redux';

import {
  Section, SectionTitle, Row, Column, Button,
} from '../components/Page';

const ButtonSpacing = styled.div`
  padding: 0 8px 8px 0;
`;

const SimulationSection = ({
  isSimulationActive,
  isAutoPlayActive,
  onSimulationStartClick,
  onSimulationStopClick,
  onAutoPlayStartClick,
  onAutoPlayStopClick,
}) => (
  <Section>
    <Row>
      <Column>
        <SectionTitle>Simulation</SectionTitle>
        <Row>
          <ButtonSpacing>
            <Button onClick={onSimulationStartClick} disabled={isSimulationActive}>Start</Button>
          </ButtonSpacing>
          <ButtonSpacing>
            <Button onClick={onSimulationStopClick} disabled={!isSimulationActive}>Stop</Button>
          </ButtonSpacing>
        </Row>
      </Column>
      <Column>
        <SectionTitle>Automatic Play</SectionTitle>
        <Row>
          <ButtonSpacing>
            <Button onClick={onAutoPlayStartClick} disabled={isAutoPlayActive}>Start</Button>
          </ButtonSpacing>
          <ButtonSpacing>
            <Button onClick={onAutoPlayStopClick} disabled={!isAutoPlayActive}>Stop</Button>
          </ButtonSpacing>
        </Row>
      </Column>
    </Row>
  </Section>
);
SimulationSection.propTypes = {
  isSimulationActive: PropTypes.bool.isRequired,
  isAutoPlayActive: PropTypes.bool.isRequired,
  onSimulationStartClick: PropTypes.func.isRequired,
  onSimulationStopClick: PropTypes.func.isRequired,
  onAutoPlayStartClick: PropTypes.func.isRequired,
  onAutoPlayStopClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isSimulationActive: getIsSimulationActive(state),
  isAutoPlayActive: getIsAutoPlayActive(state),
});
const mapDispatchToProps = dispatch => ({
  onSimulationStartClick: () => dispatch(setSimulationActiveAction(true)),
  onSimulationStopClick: () => dispatch(setSimulationActiveAction(false)),
  onAutoPlayStartClick: () => dispatch(setAutoPlayActiveAction(true)),
  onAutoPlayStopClick: () => dispatch(setAutoPlayActiveAction(false)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SimulationSection);
