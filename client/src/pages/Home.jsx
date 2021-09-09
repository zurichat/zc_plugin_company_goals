import OrganizationVisionEditModal from '../components/organization_vision/org_edit_vision/modal/EditOrgVisionModal';
import styled from 'styled-components';

import SimpleModal from '../components/createGoal/CreateGoal';

import DeleteSuccessModal from '../components/DeleteSuccess/DeleteSuccessModal';
import Deletemodal from '../components/Deletemodal/Deletemodal';
import BasicModal from '../components/EditGoal/EditGoal';
import MissionVisionContainer from '../components/header/Header';
import Mainside from '../components/mainside/Mainside';
import EditMission from '../components/Modal/EditMisssion';
import Nav from '../components/navbar/Navbar';


function App() {
  return (
    <>
      <SimpleModal />
      <Deletemodal />
      <BasicModal />
      <DeleteSuccessModal />
      <OrganizationVisionEditModal />
      {/* <PluginSide>
        <Nav />
        <MissionVisionContainer />
        <Mainside />
        <EditMission />
      </PluginSide> */}
    </>
  );
}

export default App;

const PluginSide = styled.div`
  width: 100%;
  background-color: #f6f6f6;
  padding-bottom: 20px;
`;
