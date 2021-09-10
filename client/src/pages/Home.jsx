import styled from 'styled-components';
import Design from 'components/Dropdown/Design';
import MenuOption from 'components/Dropdown/MenuOption';
import Mobile from 'components/Dropdown/Mobile';
import MobilePrivate from 'components/Dropdown/MobilePrivate';
import SimpleModal from '../components/createGoal/CreateGoal';
import Deletemodal from '../components/Deletemodal/Deletemodal';
// eslint-disable-next-line import/no-unresolved
import DeleteSuccessModal from '../components/DeleteSuccess/DeleteSuccessModal';
import BasicModal from '../components/EditGoal/EditGoal';
import MissionVisionContainer from '../components/header/Header';
import Mainside from '../components/mainside/Mainside';
import EditMission from '../components/Modal/EditMisssion';
import Nav from '../components/navbar/Navbar';
import OrganizationVisionEditModal from '../components/organization_vision/org_edit_vision/modal/EditOrgVisionModal';


function App() {
  return (
    <>
      <SimpleModal />
      <Deletemodal />
      <BasicModal />
      <DeleteSuccessModal />
      <OrganizationVisionEditModal />
      <PluginSide>
        <Nav />
        <MissionVisionContainer />
        <Mainside />
        <EditMission />
      </PluginSide>
      <Design />
      <MenuOption />
      <Mobile />
      <MobilePrivate />
    </>
  );
}

export default App;

const PluginSide = styled.div`
  width: 100%;
  background-color: #f6f6f6;
  padding-bottom: 20px;
`;
