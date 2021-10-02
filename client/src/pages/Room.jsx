import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import CentrifugeClient from 'centrifuge';
import styled from 'styled-components';
import MainApp from '../components/main_app/MainApp';
import { storeRoomId } from '../redux/organizationRoom.slice';
import { activateSnackbar } from '../redux/snackbar.slice';
import { addNotificationFromRTC } from '../redux/notificationSlice';
import { updateOrgMissionFromRTC } from '../redux/organizationMission.slice';
import { updateOrgVisionFromRTC } from '../redux/organizationVision.slice';
import AppHeader from '../components/app_header/AppHeader';
import SuccessModal from '../components/goalSucces/SuccessModal';
import Deletemodal from '../components/Deletemodal/Deletemodal';
import SnackBar from '../components/snackbar/Snackbar';
import SimpleModal from '../components/create_goal/CreateGoal';
import DeleteErrorModal from '../components/DeleteError/DeleteErrorModal';
import DeleteSuccessModal from '../components/DeleteSuccess/DeleteSuccessModal';
import BasicModal from '../components/EditGoal/EditGoal';
import MissionVisionContainer from '../components/header/Header';

import EditMission from '../components/modal/EditMission';

import OrganizationVisionEditModal from '../components/organization_vision/org_edit_vision/modal/EditOrgVisionModal';
import { GetUserInfo } from '@zuri/control';
import { GetUsers } from '../components/app_header/AppHeader';

const AppRoom = () => {
  let { orgId } = useParams();
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(storeRoomId(orgId));
  //   }, []);
  const centrifugeConnect = new CentrifugeClient('wss://realtime.zuri.chat/connection/websocket', { minRetry: 100000 });
  // const centrifugeConnect = new CentrifugeClient('ws://localhost:8000/connection/websocket');
  // centrifugeConnect.setToken(
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM3MjIiLCJleHAiOjE2MzIwMzAyNjV9.mR1EBjkfXce2CZ0H3UEYLOQCxdLlhtg32XBJldSqbno'
  // );
  async function userInfo() {
    const info = await GetUserInfo('markessien@gmail.com');
    console.log('blah', info);
  }
  useEffect(() => {
    centrifugeConnect.on('connect', function (ctx) {
      console.log('connected', ctx);
      userInfo();
      dispatch(activateSnackbar({ content: 'Connected to Centifugo 🥳', severity: 'info' }));
    });

    centrifugeConnect.on('disconnect', function (ctx) {
      console.log('disconnected', ctx);
      userInfo();
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
    centrifugeConnect.subscribe('CreateOrganizationMember', function (ctx) {
      console.log('CreateOrganizationMember', ctx);
      GetUsers();
    });
    centrifugeConnect.subscribe('DeactivateOrganizationMember', function (ctx) {
      console.log('DeactivateOrganizationMember', ctx);
      GetUsers();
    });
    centrifugeConnect.subscribe('ReactivateOrganizationMember', function (ctx) {
      console.log('ReactivateOrganizationMember', ctx);
      GetUsers();
    });

    centrifugeConnect.connect();
  }, []);
  return (
    <>
      <AppHeader />
      <SuccessModal />
      <SimpleModal />
      <Deletemodal />
      <BasicModal />
      <DeleteSuccessModal />
      <DeleteErrorModal />
      <OrganizationVisionEditModal />
      <EditMission />
      <SnackBar />
      <PluginSide>
        <MissionVisionContainer />
        <MainApp />
      </PluginSide>
    </>
  );
};

export default AppRoom;

const PluginSide = styled.div`
  width: 100%;
  background-color: #f6f6f6;
  padding-bottom: 20px;
`;
