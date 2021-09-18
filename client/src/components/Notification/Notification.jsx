import React, { useState } from 'react';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

<<<<<<< HEAD

=======
>>>>>>> 2869f49249f6734b3afb3c0ba3e4554af58c4aa3
let notifyAlerts = [
  {
    id: 1,
    message: 'Your goal as been achieved',
    link: 'Create wireframe',
    info: 'Congratulations you you have achieved this goal! All set targets have been met.',
    time: '2 mins ago',
    status: 'finished',
  },
  {
    id: 2,
    message: 'Some goals updated, Please check',
    link: 'Create wireframe',
    time: '2 weeks ago',
    info: 'Goal Updated, Do needful.',
    status: 'updated',
  },
  {
    id: 3,
    message: 'You failed to reach this goal',
    link: 'Create wireframe',
    info: 'Oops, you failed this goal.',
    time: '1 min ago',
    status: 'failed',
  },
];

function Notification() {
  const [show, setShow] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [index, setIndex] = useState(0);

  const handleClick = () => {
    notifyAlerts = [];
    setShow(false);
  };

  const handleAccordion = (e, id) => {
    if (e.target.name !== 'create-wireframe') {
      setIsActive(!isActive);
      setIndex(id);
    }
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
              {notifyAlerts.map(({ id, status, message, info, time, link }) => {
                return (
                  <Grid key={id} gridActive={id === index} borderBottom>
                    <MailOutlineIcon style={{ margin: '0 auto', color: '#999999' }} />
                    <FlexColumn>
                      <FlexRows onClick={(e) => handleAccordion(e, id)} Rows goalachievedTimeline>
                        <FlexColumn flexBasicsColumn>
                          <Paragraph style={{ marginBottom: '10px' }} goalParagraphHeader>
                            {message}
                          </Paragraph>
                          <Button
                            status
                            name="create-wireframe"
                            failed={status === 'failed'}
                            finished={status === 'finished'}
                            updated={status === 'updated'}
                            goalButtonHeaderWireframe
                          >
                            {link}
                          </Button>
                        </FlexColumn>
                        <FlexColumn arrowContainer>
                          {index === id && isActive ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                          <Paragraph flexbasicsParagraph>{time}</Paragraph>
                        </FlexColumn>
                      </FlexRows>
                      {index === id && isActive && (
                        <FlexColumn moreNotificationInfo>
                          <Paragraph moreInfo>{info}</Paragraph>
                          <FlexRows>
                            <Button btnFunction>View goal</Button>
                            <Button btnFunction>Mark as Unread</Button>
                          </FlexRows>
                        </FlexColumn>
                      )}
                    </FlexColumn>
                  </Grid>
                );
              })}
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
