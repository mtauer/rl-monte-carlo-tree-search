/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import fromPairs from 'lodash/fromPairs';
import { scaleLinear } from 'd3-scale';
import { rgb } from 'd3-color';
import { interpolateHcl } from 'd3-interpolate';

import {
  locationsMap, DRIVE_FERRY, DIRECT_FLIGHT, TREAT_DISEASE,
} from '.';
import {
  DISEASE_YELLOW, DISEASE_RED, DISEASE_BLUE, DISEASE_BLACK,
} from './constants';

const Container = styled.div`
`;
const Row = styled.div`
  display: flex;
  margin-bottom: 1px;
  height: 80px;
`;
const ValueContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 70px;
`;
const Value = styled.p`
  display: block;
  font-size: 12px;
`;
const ActionContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 12px 12px;
`;
const ActionTitle = styled.p`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 21px;
  margin: 0;
  padding: 0 0 4px 0;
`;
const ActionDetails = styled.div`
  display: flex;
`;
const Property = styled.p`
  background-color: rgba(255, 255, 255, 0.2);
  display: block;
  font-size: 12px;
  margin: 0 8px 3px 0;
  padding: 2px 6px 4px 6px;
`;
const PropertyName = styled.span`
  display: inline-block;
  opacity: 0.6;
`;
const PropertyValue = styled.span`
  display: inline-block;
`;
const Disease = styled.span`
  border-radius: 50%;
  display: inline-block;
  height: 10px;
  margin: 0 0 0 4px;
  width: 10px;
  transform: translateY(1px);
`;

const NextActions = ({ gameResult }) => {
  const nextActionNodes = gameResult ? gameResult.children : [];
  const nextActions = nextActionNodes.map(n => n.action);
  const nextActionValuesMap = fromPairs(
    nextActionNodes.map((n, i) => [i, n.deepValue / n.deepCount]),
  );
  return (
    <Container>
      { nextActions.map((action, i) => {
        const nextActionValue = nextActionValuesMap[i];
        const cellBgColor = nextActionValue !== undefined ? getCellBgColor(nextActionValue) : '#e6e6e6';
        return (
          <Row key={i}>
            <ValueContainer style={{ backgroundColor: cellBgColor }}>
              <Value>
                {nextActionValue !== undefined ? nextActionValue.toFixed(3) : ''}
              </Value>
            </ValueContainer>
            <ActionContainer style={{ backgroundColor: cellBgColor }}>
              <ActionTitle>
                {formatActionType(action.type)}
              </ActionTitle>
              <ActionDetails>
                {formatActionDetails(action)}
              </ActionDetails>
            </ActionContainer>
          </Row>
        );
      })}
    </Container>
  );
};
NextActions.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  gameResult: PropTypes.object,
};
NextActions.defaultProps = {
  gameResult: null,
};

function formatActionType(type) {
  switch (type) {
    case DRIVE_FERRY: return 'Drive / Ferry';
    case DIRECT_FLIGHT: return 'Direct Flight';
    case TREAT_DISEASE: return 'Treat Disease';
    default: return type;
  }
}

function formatActionDetails(action) {
  switch (action.type) {
    case DRIVE_FERRY: {
      return [
        <Property key="from">
          <PropertyName>From:</PropertyName>
          <PropertyValue>
            {formatLocationName(action.from)} {formatLocationDisease(action.from)}
          </PropertyValue>
        </Property>,
        <Property key="to">
          <PropertyName>To:</PropertyName>
          <PropertyValue>
            {formatLocationName(action.to)} {formatLocationDisease(action.to)}
          </PropertyValue>
        </Property>,
      ];
    }
    case DIRECT_FLIGHT: {
      return [
        <Property key="from">
          <PropertyName>From:</PropertyName>
          <PropertyValue>
            {formatLocationName(action.from)}{formatLocationDisease(action.from)}
          </PropertyValue>
        </Property>,
        <Property key="to">
          <PropertyName>To:</PropertyName>
          <PropertyValue>
            {formatLocationName(action.to)}{formatLocationDisease(action.to)}
          </PropertyValue>
        </Property>,
        <Property key="card">
          <PropertyName>Card:</PropertyName>
          <PropertyValue>
            {formatLocationName(action.card)}{formatLocationDisease(action.card)}
          </PropertyValue>
        </Property>,
      ];
    }
    case TREAT_DISEASE: {
      return [
        <Property key="at">
          <PropertyName>At:</PropertyName>
          <PropertyValue>
            {formatLocationName(action.at)}
          </PropertyValue>
        </Property>,
        <Property key="disease">
          <PropertyName>Disease:</PropertyName>
          <PropertyValue>
            {formatDisease(action.disease)}
          </PropertyValue>
        </Property>,
      ];
    }
    default: return null;
  }
}

function formatLocationName(id) {
  return locationsMap[id].name;
}

function formatLocationDisease(id) {
  return formatDisease(locationsMap[id].disease);
}

function formatDisease(disease) {
  const diseaseColors = {
    [DISEASE_YELLOW]: '#ffffbf',
    [DISEASE_RED]: '#d7191c',
    [DISEASE_BLUE]: '#2c7bb6',
    [DISEASE_BLACK]: '#404040',
  };
  const bgColor = diseaseColors[disease];
  return (<Disease style={{ backgroundColor: bgColor }} />);
}

function getCellBgColor(value) {
  if (!value) { return '#e6e6e6'; }
  const valueColor = scaleLinear().domain([-1.0, 0.0, 1.0])
    .interpolate(interpolateHcl)
    .range([rgb('#a50026'), rgb('#ffffff'), rgb('#1a9850')]);
  return valueColor(value);
}

export default NextActions;
