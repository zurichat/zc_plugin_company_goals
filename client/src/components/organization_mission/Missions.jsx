import React from 'react'
import {useDispatch , useSelector} from 'react-redux';
import { showEditMissionModal } from '../../redux/editMission.slice';
import EditMission from '../Modal/EditMission'
import editImg from '../organization_vision/org_display_vision/visionAsset/editImg.png'
import { 
   Editbutton,
   MissionField,
   Title,
   Box,
 } from './missions.style';

const Missions = () => {
  const dispatch = useDispatch();
  const { missionText } = useSelector(state => state.editMission);
   return (
      <div>
         <Title top="15%" left="10.5%" rsTop="5%" rsLeft="7%" color="#000000">Mission</Title>
        <Box className="box"> 
            <MissionField>{missionText}</MissionField>
            <Editbutton onClick={() => dispatch(showEditMissionModal())} className="editMissionbutton" left="90%" rsLeft="80%" ><img src={editImg} alt="edit" /></Editbutton>
        </Box>
      </div>
   )
}
export default Missions
