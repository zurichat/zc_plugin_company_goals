import { useState } from 'react';
import Report from '../updates/Report';
import Notification from '../Notification/Notification';

import { Tabs } from './ReportsAndNotificationContainer.styled';
import { NavTabs } from './ReportsAndNotificationContainer.styled';
import { NavContainer } from './ReportsAndNotificationContainer.styled';
import { TabButton } from './ReportsAndNotificationContainer.styled';
import { TabButtonNotification } from './ReportsAndNotificationContainer.styled';
import { Span } from './ReportsAndNotificationContainer.styled';

const ReportsAndNotificationContainer = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const handleTab1 = () => setActiveTab('tab1');
  const handleTab2 = () => setActiveTab('tab2');

  return (
    <Tabs>
      <NavTabs>
        <NavContainer>
          <TabButtonNotification border={activeTab === 'tab1'}>
            <TabButton
              color={activeTab === 'tab1'}
              style={{ cursor: 'pointer' }}
              onClick={handleTab1}
              color={activeTab === 'tab1'}
            >
              Reports
            </TabButton>
          </TabButtonNotification>
        </NavContainer>
        <NavContainer>
          <TabButtonNotification border={activeTab === 'tab2'}>
            <TabButton color={activeTab === 'tab2'} style={{ cursor: 'pointer' }} onClick={handleTab2}>
              Notifications
            </TabButton>
            <Span>6</Span>
          </TabButtonNotification>
        </NavContainer>
      </NavTabs>
      <div style={{ width: '100%' }}>{activeTab === 'tab1' ? <Report /> : <Notification />}</div>
    </Tabs>
  );
};

export default ReportsAndNotificationContainer;
