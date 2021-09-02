import React from 'react';

import MailOutlineIcon from '@material-ui/icons/MailOutline';

import visible from '../../Images/active.svg';
import { NotificationCount, NotificationHeader, NotificationSection , FlexColumn , NotificationWrapper , Paragraph , FlexRow } from './styledNotification';

function Notification() {
  return (
    <NotificationSection>
      <NotificationWrapper>
        {/* Header */}
        <NotificationHeader>
          <NotificationCount style={{ marginLeft: '30px' }}>
            2 (<span style={{ color: 'red' }}>1</span>)
          </NotificationCount>
          <Paragraph style={{ marginRight: '30px' }}>Mark all as read</Paragraph>
        </NotificationHeader>
        <FlexColumn>
          <FlexColumn backgroundWhite borderRight>
            <Paragraph primary>2mins ago</Paragraph>
            <FlexRow height>
              <MailOutlineIcon style={{ padding: '0 24px' }} />
              <FlexColumn items>
                <Paragraph achieved>Our goal as been achieved</Paragraph>
                <Paragraph green>Create wireframe</Paragraph>
              </FlexColumn>
            </FlexRow>
            <Paragraph secondary>
              <img style={{ marginRight: '5px' }} src={visible} alt="Visible" />
              66
            </Paragraph>
          </FlexColumn>

          <FlexColumn darkColor backgroundWhite>
            <Paragraph darkColor primary>
              2days ago
            </Paragraph>
            <FlexRow height>
              <MailOutlineIcon style={{ padding: '0 24px' }} />
              <FlexColumn items>
                <Paragraph darkColor achieved>
                  We failed to reach this goal
                </Paragraph>
                <Paragraph red>Create wireframe</Paragraph>
              </FlexColumn>
            </FlexRow>
            <Paragraph darkColor secondary>
              <img style={{ marginRight: '5px' }} src={visible} alt="Visible" />
              66
            </Paragraph>
          </FlexColumn>
        </FlexColumn>
      </NotificationWrapper>
    </NotificationSection>
  );
}

export default Notification;
