/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useRouteMatch, Route, Switch, withRouter } from 'react-router-dom';
import Faqs from './pages/Faq';
import Home from './pages/Home';
import { useEffect } from 'react';
import CentrifugeClient from 'centrifuge';
import { useDispatch } from 'react-redux';
import { updateOrgVisionFromRTC } from './redux/organizationVision.slice';
import { activateSnackbar } from './redux/snackbar.slice';
import { setNewMission, getMission } from './services/missionAPI';
import AppHeader from './components/app_header/AppHeader';
import { addNotificationFromRTC } from './redux/notificationSlice';
import { updateOrgMissionFromRTC } from './redux/organizationMission.slice';
import Landing from './components/main_app/Landing';

function App(props) {
  const dispatch = useDispatch();
  const centrifugeConnect = new CentrifugeClient('wss://realtime.zuri.chat/connection/websocket', { minRetry: 100000 });
  // const centrifugeConnect = new CentrifugeClient('ws://localhost:8000/connection/websocket');
  // centrifugeConnect.setToken(
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM3MjIiLCJleHAiOjE2MzIwMzAyNjV9.mR1EBjkfXce2CZ0H3UEYLOQCxdLlhtg32XBJldSqbno'
  // );
  useEffect(() => {
    centrifugeConnect.on('connect', function (ctx) {
      console.log('connected', ctx);
      dispatch(activateSnackbar({ content: 'Connected to Centifugo 🥳', severity: 'info' }));
    });

    centrifugeConnect.on('disconnect', function (ctx) {
      console.log('disconnected', ctx);
      dispatch(activateSnackbar({ content: 'Failed to connect to Centifugo 😭', severity: 'error' }));
    });

    centrifugeConnect.subscribe('goalNotifications', function (ctx) {
      console.log('goalNotifications', ctx);
      dispatch(addNotificationFromRTC(ctx.data));
    });

    centrifugeConnect.subscribe('publish-mission-update', function (ctx) {
      console.log('publish-mission-update', ctx);
      dispatch(updateOrgMissionFromRTC(ctx.data));
    });

    centrifugeConnect.subscribe('publish-vision-update', function (ctx) {
      console.log('publish-vision-update', ctx);
      dispatch(updateOrgVisionFromRTC(ctx.data));
    });

    centrifugeConnect.connect();
  }, []);
    let {isExact} = useRouteMatch('/');
    
  return (
    <>
     { !isExact && <AppHeader />}
        <Suspense fallback={<CircularProgress />}>
          <Switch>
            <Route path="/" component={Landing} exact />
            <Route path="/goals" component={Home} exact />
            <Route path="/goals/faqs" component={Faqs} />
          </Switch>
        </Suspense>
    </>
  );
}

export default withRouter(App);
