import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import styled from 'styled-components';

const ReportsAndNotificationAppBar = styled(AppBar)`
  background-color: #fff;
  margin-bottom: 1rem !important;
`;
const ReportsAndNotificationTabs = styled(Tabs)`
  & .MuiTabs-flexContainer {
    justify-content: space-between;
  }
`;
const ReportsAndNotificationTab = styled(Tab)`
  color: #999999;
  text-transform: capitalize;
  /* border-bottom: 2px solid green; */
  padding-bottom: 0;
`;

export { ReportsAndNotificationAppBar, ReportsAndNotificationTabs, ReportsAndNotificationTab };
