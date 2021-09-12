import { useState } from 'react';
<<<<<<< HEAD

import PropTypes from 'prop-types';

import Report from '../updates/Report';
import {
  ReportsAndNotificationAppBar,
  ReportsAndNotificationTabs,
  ReportsAndNotificationTab,
} from './ReportsAndNotificationContainer.styled';
=======
import Report from '../updates/Report';
>>>>>>> 2869f49249f6734b3afb3c0ba3e4554af58c4aa3
import Notification from '../Notification/Notification';

import { Tabs } from './ReportsAndNotificationContainer.styled';
import { NavTabs } from './ReportsAndNotificationContainer.styled';
import { NavContainer } from './ReportsAndNotificationContainer.styled';
import { TabButton } from './ReportsAndNotificationContainer.styled';

const ReportsAndNotificationContainer = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const handleTab1 = () => setActiveTab('tab1');
  const handleTab2 = () => setActiveTab('tab2');

  return (
    <Tabs>
      <NavTabs>
        <NavContainer>
          <TabButton onClick={handleTab1} color={activeTab === 'tab1'}>
            Reports
          </TabButton>
        </NavContainer>
        <NavContainer>
          <TabButton color={activeTab === 'tab2'} onClick={handleTab2}>
            Notifications
          </TabButton>
        </NavContainer>
      </NavTabs>
      <div style={{ width: '100%' }}>{activeTab === 'tab1' ? <Report /> : <Notification />}</div>
    </Tabs>
  );
};

export default ReportsAndNotificationContainer;
