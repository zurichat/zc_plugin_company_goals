import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showEditMissionModal } from '../../redux/editMission.slice';
// import EditMission from '../modal/EditMission'
import editImg from '../organization_vision/org_display_vision/visionAsset/editImg.png';
import { Editbutton, MissionField, MissionContainer, Title, Box } from './missions.style';

const Missions = () => {
  const dispatch = useDispatch();
  const { missionText } = useSelector((state) => state.editMission);
  const jsonMissionText = window.localStorage.getItem('mission');
  const text = JSON.parse(jsonMissionText);

  const handleClick = () => dispatch(showEditMissionModal());

  return (
    <MissionContainer>
      <Title top="-25%" left="2%" rsTop="-30%" rsLeft="3%" color="#000000">
        Mission
      </Title>
      <Box className="box">
        {/* <MissionField>{missionText}</MissionField> */}
        <MissionField>{text ? text : 'Click Icon to Add Mission'}</MissionField>
        <Editbutton onClick={handleClick} className="editMissionbutton" left="90%" rsLeft="85%">
          <img src={editImg} alt="edit" />
        </Editbutton>
      </Box>
    </MissionContainer>
  );
};
export default Missions;
