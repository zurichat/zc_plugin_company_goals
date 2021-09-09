import React, { useState } from 'react';

import MailOutlineIcon from '@material-ui/icons/MailOutline';

import NoNotification from './NoNotification';

import {
  NotificationCount,
  NotificationHeader,
  NotificationSection,
  FlexColumn,
  NotificationWrapper,
  Paragraph,
  Button,
  Grid,
  Section,
} from './styledNotification';


let notifyAlerts = [
  {
    id: 1,
    message: 'Your goal as been achieved',
    link: 'Create wireframe',
    time: '2 mins ago',
  },
  {
    id: 2,
    message: 'Your goal as been achieved',
    link: 'Create wireframe',
    time: '2 weeks ago',
  },
  {
    id: 3,
    message: 'You failed to reach this goal',
    link: 'Create wireframe',
    time: '1 min ago',
  },
];

function Notification() {
  const [show, setShow] = useState(true);

  const handleClick = () => {
    notifyAlerts = [];
    setShow(false);
  };
  return (
    <NotificationSection>
      <NotificationWrapper>
        {/* Header */}
        <NotificationHeader>
          <NotificationCount style={{ marginLeft: '30px' }}>{show ? notifyAlerts.length : 0}</NotificationCount>
          <Button style={{ marginRight: '30px' }}>
            {show ? (
              <span style={{ cursor: 'pointer' }} onClick={handleClick}>
                Mark all as read
              </span>
            ) : (
              'Empty'
            )}{' '}
          </Button>
        </NotificationHeader>
        <FlexColumn backgroundWhite>
          {show ? (
            <>
              <Grid darkColor>
                {notifyAlerts.map((alert) => (
                  <>
                    <MailOutlineIcon style={{ color: '#999999' }} />
                    <FlexColumn items>
                      <Paragraph dark achieved>
                        {alert.message}
                      </Paragraph>
                      <Paragraph green>{alert.link}</Paragraph>
                    </FlexColumn>
                    <Paragraph darkColor primary>
                      {alert.time}
                    </Paragraph>
                  </>
                ))}
              </Grid>
              {/* <Grid>
                <MailOutlineIcon style={{ color: '#999999' }} />
                <FlexColumn items>
                  <Paragraph achieved></Paragraph>
                  <Paragraph green></Paragraph>
                </FlexColumn>
                <Paragraph primary>2mins ago</Paragraph>
              </Grid>
              
              <Grid darkColor>
                <MailOutlineIcon style={{ color: '#999999' }} />
                <FlexColumn items>
                  <Paragraph dark achieved>
                    You failed to reach this goal
                  </Paragraph>
                  <Paragraph red>Create wireframe</Paragraph>
                </FlexColumn>
                <Paragraph darkColor primary>
                  1 mins ago
                </Paragraph>
              </Grid>{' '} */}
            </>
          ) : (
            <>
              <NoNotification />
            </>
          )}
          <Section flexend>
            <Button style={{ marginRight: '5px' }} darkColor>
              {show && 'See Less'}
            </Button>
          </Section>
        </FlexColumn>
      </NotificationWrapper>
    </NotificationSection>
  );
}

export default Notification;
