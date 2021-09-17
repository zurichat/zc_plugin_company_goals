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
import Missions from 'components/missions/Missions';
import arrDown from '../organization_vision/org_display_vision/visionAsset/arr-down.png'
const Header = () => {
  // const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  // const [isAdmin] = useState(true);
  // const classes = useStyles();
  // const {missionText} = useSelector(state => state.editMission);
  const collapseInput = () => {
    document.querySelector('.missionInput').style.display = 'none'
    document.querySelector('.visionInput').style.display = 'none'
    document.querySelector('.editbutton').style.display = 'none'
    document.querySelector('.editMissionbutton').style.display = 'none'
  }
  return (
    <>
      <MVContain>
        <Missions />
        <CollapseButton
        bgColor="#00b87c"
        top="50%"
        right="5.8%"
        rstop="24%"
        rsright="3%"
        display="none"
        rsdisplay ="block"
        onClick={collapseInput} 
        >
        <img src={arrDown} alt="Arrow-down"/>
        </CollapseButton>
        <Div>
        <DisplayOrganizationVision />
        <CollapseButton
        bgColor="#00b87c"
        top="50%"
        right="5.8%"
        rstop="68%"
        rsright="3%"
        onClick={collapseInput}  
        >
          <img src={arrDown} alt="Arrow-down"/>
        </CollapseButton>
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

  @media only screen and (max-width: 420px) {
    flex-direction: column;   
    padding-top: 1rem;
  }
`
const CollapseButton = styled.button `
  position:absolute;
  display: ${(props) => props.display};
  width: 60px;
  height: 61px;
  color: #fff;
  border: none;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  background: ${(props) => props.bgColor};
  border-radius: 0px 6px 0px 0px;
  cursor: pointer;

   @media only screen and (max-width: 420px){
      display: ${(props) => props.rsdisplay};
      width: 40px;
      height: 45px;
      top: ${(props) => props.rstop};
      right: ${(props) => props.rsright};
   }
`
const Div = styled.div `
  display:flex;
  justify-content: center
`
