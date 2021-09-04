import React from 'react';
import { NotificationCount, NotificationHeader, NotificationSection } from './StyledNotificationBar';
import { NotificationWrapper } from './StyledNotificationBar';
import { Paragraph } from './StyledNotificationBar';
import { makeStyles } from '@material-ui/core/styles';
import Notification from '../Notification/Notification';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  notie: {
    borderBottom: '2px solid green',
    float: 'right',
    position: 'relative',
    color: 'grey',
    marginRight: 50,
    marginTop: 10,
    paddingBottom: 15,
  },
  sup: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 100,
  },

});

function Notifications() {
  const classes = useStyles();
  return (
    <NotificationSection>
      <NotificationWrapper>
        <div>
          <a className={classes.notie}>
            Notification <sup className={classes.sup}>8</sup>
          </a>
        </div>
        <div>
          <Notification />
        </div>
      </NotificationWrapper>
    </NotificationSection>
  );
}

export default Notifications;
