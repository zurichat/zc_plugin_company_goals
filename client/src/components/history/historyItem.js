/* eslint-disable react/destructuring-assignment */
import { HistoryItems } from './history.styled';

const HistoryItem = ({ history }) => {
  // eslint-disable-next-line react/destructuring-assignment
  // eslint-disable-next-line react/prop-types
  return history.map((item) => (
    <HistoryItems>
      <span>{item.timeVisited}</span>
      <h3>{item.locationLastVisited}</h3>
    </HistoryItems>
  ));
};

export default HistoryItem;
