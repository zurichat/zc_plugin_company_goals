import { useEffect, useState } from 'react';
import Report from '../updates/Report';
import Notification from '../Notification/Notification';

import { Tabs } from './ReportsAndNotificationContainer.styled';
import { NavTabs } from './ReportsAndNotificationContainer.styled';
import { NavContainer } from './ReportsAndNotificationContainer.styled';
import { TabButton } from './ReportsAndNotificationContainer.styled';
import { TabButtonNotification } from './ReportsAndNotificationContainer.styled';
import { Span } from './ReportsAndNotificationContainer.styled';
import { useSelector } from 'react-redux';
import { selectNotifications, getNotifications } from '../../redux/notificationSlice';
import { getPieChart } from '../../redux/pieChartSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { GetUserInfo, SubscribeToChannel } from '@zuri/utilities';
import { getAverageProgress } from '../../redux/averageGoal.slice';

const ReportsAndNotificationContainer = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const handleTab1 = () => setActiveTab('tab1');
  const handleTab2 = () => setActiveTab('tab2');
  const dispatch = useDispatch();
  const { orgId } = useParams();

  useEffect(() => {
    dispatch(getNotifications(orgId));

  }, [dispatch]);

  useEffect(() => {
    dispatch(getPieChart(orgId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAverageProgress(orgId));
  })

  const notifications = useSelector(selectNotifications);

 
  return (
    <Tabs>
      <NavTabs>
        <NavContainer>
          <TabButtonNotification border={activeTab === 'tab1'}>
            <TabButton
              color={`${activeTab === 'tab1'}`}
              style={{ cursor: 'pointer' }}
              onClick={handleTab1}
            >
              Reports
            </TabButton>
          </TabButtonNotification>
        </NavContainer>
        <NavContainer>
          <TabButtonNotification border={activeTab === 'tab2'}>
            <TabButton color={`${activeTab === 'tab2'}`} style={{ cursor: 'pointer' }} onClick={handleTab2}>
              Notifications
            </TabButton>
            <Span>{notifications.filter(item=>!item.isRead).length}</Span>
          </TabButtonNotification>
        </NavContainer>
      </NavTabs>
      <div style={{ width: '100%' }}>{activeTab === 'tab1' ? <Report /> : <Notification />}</div>
    </Tabs>
  );
};

export default ReportsAndNotificationContainer;
