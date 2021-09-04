/* eslint-disable react/destructuring-assignment */
import React from 'react';

import classes from './historyItem.module.css';

const HistoryItem = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  // eslint-disable-next-line react/prop-types
  const historyContainer = props.history.map((element) => {
    const historyItemClasses = !element.latestVisited ? `${classes.row}` : `${classes.row} ${classes.active}`;
    return (
      <div className={historyItemClasses}>
        <span>{element.timeVisited}</span>
        <h3>{element.locationLastVisited}</h3>
      </div>
    );
  });
  return <>{historyContainer}</>;
};

export default HistoryItem;
