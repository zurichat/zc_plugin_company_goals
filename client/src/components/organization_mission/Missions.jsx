import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showEditMissionModal } from '../../redux/editMission.slice';
// import EditMission from '../modal/EditMission'
import editImg from '../organization_vision/org_display_vision/visionAsset/editImg.png';
import { Editbutton, MissionField, Title, Box } from './missions.style';

const Missions = () => {
  const dispatch = useDispatch();
  const { missionText } = useSelector((state) => state.editMission);
  const jsonMissionText = window.localStorage.getItem('mission');
  const text = JSON.parse(jsonMissionText);

  const handleClick = () => dispatch(showEditMissionModal());

  return (
    <div>
      <Title top="15%" left="10.5%" rsTop="5%" rsLeft="7%" color="#000000">
        Mission
      </Title>
      <Box className="box">
        {/* <MissionField>{missionText}</MissionField> */}
        <MissionField>{text ? text : 'Click Icon to Add Mission'}</MissionField>
        <Editbutton onClick={handleClick} className="editMissionbutton" left="90%" rsLeft="80%">
          <img src={editImg} alt="edit" />
        </Editbutton>
      </Box>
    </div>
  );
};
export default Missions;
