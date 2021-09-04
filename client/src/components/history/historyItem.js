/* eslint-disable react/destructuring-assignment */
import styled from 'styled-components';
import React from 'react';
import HistoryItems,{ColorSecondary} from './Item';

const HistoryItem = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  // eslint-disable-next-line react/prop-types
  const historyContainer = props.history.map((element) => {
    return (
      <HistoryItems>
        <ColorSecondary>{element.timeVisited}</ColorSecondary>
        <h3>{element.locationLastVisited}</h3>
      </HistoryItems>
    );
  });
};

export default HistoryItem;
