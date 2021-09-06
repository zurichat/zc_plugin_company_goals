import {Button, History, HeaderH3, Histories } from './history.styled.js';
import HistoryItem from './historyItem';
import Grid from '@material-ui/core/Grid';

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
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-end">
          <HeaderH3>History</HeaderH3>
          <Button>View all</Button>
        </Grid>
        <Histories>
          <HistoryItem history={history} />          
        </Histories>
    </History>
  );
};

export default HistoryList;