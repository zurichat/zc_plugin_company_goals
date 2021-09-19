import React from 'react'
import editImg from '../organization_vision/org_display_vision/visionAsset/editImg.png'
import { 
   Editbutton,
   Input,
   Title,
   Box,
 } from './missions.style';

const Missions = () => {
   return (
      <div>
         <Title top="15%" left="10.5%" rsTop="5%" rsLeft="7%" color="#000000">Mission</Title>
    <Box className="box">
        <div>
          <Input className="missionInput" padding="5px" placeholder="Click to add Mission"></Input>
        </div>
      <Editbutton className="editMissionbutton" left="90%" rsLeft="80%"><img src={editImg} alt="edit" /></Editbutton>
    </Box>

      </div>
   )
}
export default Missions
