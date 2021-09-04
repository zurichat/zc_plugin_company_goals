import React from 'react';

import styled from 'styled-components';

import HistoryItem from './historyItem';

import {Row, History} from './Item';

import {Goal} from '../mainside/mainside.styled.js';

const history = [
  {
    timeVisited: '2 days ago',
    locationLastVisited: 'User Interface Design',
    latestVisited: false,
  },
  {
    timeVisited: 'Few mins ago',
    locationLastVisited: 'Create Wire frame',
    latestVisited: true,
  },
  {
    timeVisited: '2 days ago',
    locationLastVisited: 'User Interface Design',
    latestVisited: false,
  },
];

const HistoryList = () => {
  // Note: button will be changed to link after importing it from 'react-router-dom'

  return (
    <History>
<Goal>
      <Row>
        <h3>History</h3>
        <Button>View all</Button>
      </Row>
      <HistoryItem history={history} />
</Goal>

    </History>
  );
};

export default HistoryList;


