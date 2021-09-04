import React from 'react';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import NotificationBar from '../notificationBar/NotificationBar';

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

function Notification() {
  return (
    <div>
            <NotificationBar />
    <NotificationSection>
      <NotificationWrapper>
        {/* Header */}
        <NotificationHeader>
          <NotificationCount style={{ marginLeft: '30px' }}>8</NotificationCount>
          <Button style={{ marginRight: '30px' }}>Mark all as read</Button>
        </NotificationHeader>
        <FlexColumn backgroundWhite>
          <Grid>
            <MailOutlineIcon style={{ color: '#999999' }} />
            <FlexColumn items>
              <Paragraph achieved>Your goal as been achieved</Paragraph>
              <Paragraph green>Create wireframe</Paragraph>
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
              2 weeks ago
            </Paragraph>
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
          </Grid>
          <Section flexend>
            <Button style={{ marginRight: '5px' }} darkColor>
              See Less
            </Button>
          </Section>
        </FlexColumn>
      </NotificationWrapper>
    </NotificationSection>  
        <NotificationSection>
      <NotificationWrapper>
        {/* Header */}
        <NotificationHeader>
          <NotificationCount style={{ marginLeft: '30px' }}>8</NotificationCount>
          <Button style={{ marginRight: '30px' }}>Mark all as read</Button>
        </NotificationHeader>
        <FlexColumn backgroundWhite>
          <Grid>
            <MailOutlineIcon style={{ color: '#999999' }} />
            <FlexColumn items>
              <Paragraph achieved>Your goal as been achieved</Paragraph>
              <Paragraph green>Create wireframe</Paragraph>
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
              2 weeks ago
            </Paragraph>
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
          </Grid>
          <Section flexend>
            <Button style={{ marginRight: '5px' }} darkColor>
              See Less
            </Button>
          </Section>
        </FlexColumn>
      </NotificationWrapper>
    </NotificationSection>
    </div>
  );
}

export default Notification;
