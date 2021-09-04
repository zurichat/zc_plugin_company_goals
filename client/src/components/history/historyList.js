import React from 'react';

import styled from 'styled-components';

import HistoryItem from './historyItem';

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
    <div>
      <Row>
        <h3>History</h3>
        <Button>View all</Button>
      </Row>
      <HistoryItem history={history} />
    </div>
  );
};

export default HistoryList;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(0, 184, 124, 1);
  width: 76%;
  margin: auto;
  margin-bottom: 0.5rem;
`;

const Button = styled.div`
  color: rgba(0, 184, 124, 1);
  border: 0;
`;
