import React from 'react';
import { NotificationCount, NotificationHeader, NotificationSection } from './styledNotification';
import { FlexColumn } from './styledNotification';
import { NotificationWrapper } from './styledNotification';
import { Paragraph } from './styledNotification';
import { FlexRow } from './styledNotification';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';

function Notification() {
  return (
    <NotificationSection>
      <NotificationWrapper>
        {/* Header */}
        <NotificationHeader>
          <NotificationCount>
            2 (<span style={{ color: 'red' }}>1</span>)
          </NotificationCount>
          <Paragraph>Mark all as read</Paragraph>
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
              <VisibilityIcon style={{ marginRight: '5px' }} />
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
              <VisibilityIcon style={{ marginRight: '5px' }} />
              66
            </Paragraph>
          </FlexColumn>
        </FlexColumn>
      </NotificationWrapper>
    </NotificationSection>
  );
}

export default Notification;
