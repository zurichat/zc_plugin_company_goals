/* eslint-disable react/destructuring-assignment */
import styled from 'styled-components';
import React from 'react';

const HistoryItem = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  // eslint-disable-next-line react/prop-types
  const historyContainer = props.history.map((element) => {
    return (
      <HistoryItems>
        <span>{element.timeVisited}</span>
        <h3>{element.locationLastVisited}</h3>
      </HistoryItems>
    );
  });
};

export default HistoryItem;
