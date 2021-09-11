import { HistoryItems, HistoryItemsHeader } from './history.styled';

const HistoryItem = ({ history }) => {
  return history.map((item) => (
    <HistoryItems>
      <span>{item.timeVisited}</span>
      <HistoryItemsHeader>{item.locationLastVisited}</HistoryItemsHeader>
    </HistoryItems>
  ));
};

export default HistoryItem;
