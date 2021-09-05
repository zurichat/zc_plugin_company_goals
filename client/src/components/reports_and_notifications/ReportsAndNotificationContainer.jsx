import { useState } from 'react';

import PropTypes from 'prop-types';

import Report from '../updates/Report';
import {
  ReportsAndNotificationAppBar,
  ReportsAndNotificationTabs,
  ReportsAndNotificationTab,
} from './ReportsAndNotificationContainer.styled';
import Notification from '../Notification/Notification';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

const ReportsAndNotificationContainer = () => {
  const [tabValue, setTabValue] = useState(0);
  return (
    <>
      <ReportsAndNotificationAppBar position="relative" elevation="0">
        <ReportsAndNotificationTabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          indicatorColor="secondary"
        >
          <ReportsAndNotificationTab label="reports" {...a11yProps(0)} />
          <ReportsAndNotificationTab label="notification" {...a11yProps(0)} />
        </ReportsAndNotificationTabs>
      </ReportsAndNotificationAppBar>
      <TabPanel value={tabValue} index={0}>
        <Report />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Notification />
      </TabPanel>
    </>
  );
};

export default ReportsAndNotificationContainer;
