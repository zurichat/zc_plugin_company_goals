import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchOrgMission, showEditMissionModal } from '../../redux/organizationMission.slice';
// import EditMission from '../modal/EditMission'
import editImg from '../organization_vision/org_display_vision/visionAsset/editImg.png';
import { GetUserInfo } from '@zuri/control';

import { ParentBox, Editbutton, MissionField, Title, Box } from './missions.style';

const Missions = () => {
  const { role } = GetUserInfo();
  const { orgId } = useParams();
  const dispatch = useDispatch();
  const { missionText } = useSelector((state) => state.organizationMission);

  const handleClick = () => dispatch(showEditMissionModal());

  useEffect(() => {
    dispatch(fetchOrgMission(orgId));
  }, []);

  return (
    <ParentBox>
      <Title>Mission</Title>

      <Box className="box">
        <MissionField>{missionText || 'Click to add a mission'}</MissionField>
        {role === 'owner' && (
          <Editbutton onClick={handleClick} className="editMissionbutton" left="90%" rsLeft="85%">
            <img src={editImg} alt="edit" />
          </Editbutton>
        )}
      </Box>
    </ParentBox>
  );
};
export default Missions;
