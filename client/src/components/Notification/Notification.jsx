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
  FlexRows,
  FlexRow,
} from './styledNotification';

let notifyAlerts = [
  {
    id: 1,
    message: 'Your goal as been achieved',
    link: 'Create wireframe',
    info: 'Congratulations you you have achieved this goal! All set targets have been met.',
    time: '2 mins ago',
    finished: true,
  },
  {
    id: 2,
    message: 'You failed to reach this goal',
    link: 'Create wireframe',
    time: '2 weeks ago',
    finished: false,
  },
  {
    id: 3,
    message: 'You failed to reach this goal',
    link: 'Create wireframe',
    time: '1 min ago',
    finished: false,
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
          <Button style={{ marginRight: '30px', color: '#999999', textDecoration: 'none' }}>
            {show ? (
              <span style={{ cursor: 'pointer' }} onClick={handleClick}>
                Mark all as read
              </span>
            ) : (
              'Empty'
            )}
          </Button>
        </NotificationHeader>
        <FlexColumn backgroundWhite>
          {show ? (
            <>
              {notifyAlerts.map(({ finished, message, info, time, link }) => (
                <Grid>
                  <MailOutlineIcon style={{ color: '#999999', width: '100%', borderRight: '2px solid #ebebeb' }} />
                  <FlexColumn>
                    <FlexRow flexRow>
                      <Grid gridInfo>
                        <Paragraph dark achieved>
                          {message}
                        </Paragraph>
                        <Paragraph green red={!finished}>
                          {link}
                        </Paragraph>
                        <Paragraph style={{ fontSize: '15px', lineHeight: '20px' }} dark>
                          {info}
                        </Paragraph>
                      </Grid>
                      <Paragraph darkColor primary>
                        {time}
                      </Paragraph>
                    </FlexRow>
                    {finished && (
                      <FlexRows style={{ marginBottom: '12px' }}>
                        <Button btnFunction>Delete</Button>
                        <Button btnFunction>Mark as Read</Button>
                        <Button btnFunction>View goal</Button>
                      </FlexRows>
                    )}
                  </FlexColumn>
                </Grid>
              ))}
            </>
          ) : (
            <>
              <NoNotification />
            </>
          )}
        </FlexColumn>
      </NotificationWrapper>
    </NotificationSection>
  );
}

export default Notification;
