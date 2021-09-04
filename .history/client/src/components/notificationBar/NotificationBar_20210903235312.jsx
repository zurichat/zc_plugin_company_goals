import React from 'react';
import { NotificationCount, NotificationHeader, NotificationSection } from './StyledNotificationBar';
import { NotificationWrapper } from './StyledNotificationBar';
import { Paragraph } from './StyledNotificationBar';
import { makeStyles } from '@material-ui/core/styles';
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

  empty: {
    textAlign: 'center',
    color: 'grey',
    paddingTop: 100,
    backgroundColor: 'white',
  },
  line: {
    borderTop: '1px solid grey',
    borderBottom: '1px solid grey',
    marginRight: 50,
    marginTop: 51,
    justifyContent: 'center',
  },
});

function Notification() {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs></Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs>
          <div>
            <a className={classes.notie}>
              Notification <sup className={classes.sup}>8</sup>
            </a>
          </div>
          {/* <div>
            <Notifica>
          </div> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default Notification;
