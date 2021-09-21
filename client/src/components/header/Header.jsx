/* eslint-disable import/order */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

// import AddIcon from '@material-ui/icons/Add';

// import ExpandLessIcon from '@material-ui/icons/ExpandLess';
// import { useDispatch } from 'react-redux';
// import { useStyles } from '../../hooks/screenSize';
// import { showEditMissionModal } from '../../redux/showEditMissionModal';
import DisplayOrganizationVision from '../organization_vision/org_display_vision/VisionDisplay';
import styled from 'styled-components';
import Missions from '../organization_mission/Missions';
import arrDown from '../organization_vision/org_display_vision/visionAsset/arr-down.png';
const Header = () => {
  // const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  // const [isAdmin] = useState(true);
  // const classes = useStyles();
  // const {missionText} = useSelector(state => state.editMission);
  const collapseInput = () => {
    document.querySelector('.missionInput').style.display = 'none';
    document.querySelector('.visionInput').style.display = 'none';
    document.querySelector('.editbutton').style.display = 'none';
    document.querySelector('.editMissionbutton').style.display = 'none';
  };
  return (
    <>
      <MVContain>
        <Missions />
        <Div>
          <DisplayOrganizationVision />
        </Div>
      </MVContain>
    </>
  );
};
export default Header;

const MVContain = styled.div`
  position: relative;
  max-width: 1120;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.7rem 0.3rem 0.5rem 0.2rem;
  top: 3rem;
  margin-bottom: 4.64rem;

  @media only screen and (max-width: 420px) {
    flex-direction: column;
    padding-top: 1rem;
  }
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
`;
