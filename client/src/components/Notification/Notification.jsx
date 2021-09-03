import React from 'react';
import { NotificationCount, NotificationHeader, NotificationSection } from './styledNotification';
import { FlexColumn } from './styledNotification';
import { NotificationWrapper } from './styledNotification';
import { Paragraph } from './styledNotification';
import { FlexRow } from './styledNotification';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { Button } from './styledNotification';
import { Section } from './styledNotification';

function Notification() {
  return (
    <NotificationSection>
      <NotificationWrapper>
        {/* Header */}
        <NotificationHeader>
          <NotificationCount style={{ marginLeft: '30px' }}>8</NotificationCount>
          <Button style={{ marginRight: '30px' }}>Mark all as read</Button>
        </NotificationHeader>
        <FlexColumn>
          <FlexColumn backgroundWhite>
            <FlexRow height>
              <MailOutlineIcon />
              <FlexColumn items>
                <Paragraph achieved>Your goal as been achieved</Paragraph>
                <Paragraph green>Create wireframe</Paragraph>
              </FlexColumn>
              <div>
                <Paragraph primary>2mins ago</Paragraph>
              </div>
            </FlexRow>
          </FlexColumn>

          <FlexColumn darkColor backgroundWhite>
            <FlexRow height>
              <MailOutlineIcon />
              <FlexColumn items>
                <Paragraph darkColor achieved>
                  You failed to reach this goal
                </Paragraph>
                <Paragraph red>Create wireframe</Paragraph>
              </FlexColumn>
              <Paragraph darkColor primary>
                1 weeks ago
              </Paragraph>
            </FlexRow>
          </FlexColumn>
          <FlexColumn darkColor backgroundWhite>
            <FlexRow height>
              <MailOutlineIcon />
              <FlexColumn items>
                <Paragraph darkColor achieved>
                  You failed to reach this goal
                </Paragraph>
                <Paragraph red>Create wireframe</Paragraph>
              </FlexColumn>
              <Paragraph darkColor primary>
                5 days ago
              </Paragraph>
            </FlexRow>
          </FlexColumn>
          <FlexColumn darkColor backgroundWhite>
            <FlexRow height>
              <MailOutlineIcon />
              <FlexColumn items>
                <Paragraph darkColor achieved>
                  You failed to reach this goal
                </Paragraph>
                <Paragraph red>Create wireframe</Paragraph>
              </FlexColumn>
              <Paragraph darkColor primary>
                1mins ago
              </Paragraph>
            </FlexRow>
          </FlexColumn>
        </FlexColumn>

        <Section flexend>
          <Button style={{ marginRight: '5px' }}>See less</Button>
        </Section>
      </NotificationWrapper>
    </NotificationSection>
  );
}

export default Notification;
