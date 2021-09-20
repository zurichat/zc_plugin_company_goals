/* eslint-disable import/order */
import styled from 'styled-components';
import MainNav from '../components/MainNav/MainNav';
import SnackBar from '../components/snackbar/Snackbar';
import SimpleModal from '../components/create_goal/CreateGoal';
import DeleteErrorModal from '../components/DeleteError/DeleteErrorModal';
import Deletemodal from '../components/Deletemodal/Deletemodal';
import DeleteSuccessModal from '../components/DeleteSuccess/DeleteSuccessModal';
import BasicModal from '../components/EditGoal/EditGoal';
import MissionVisionContainer from '../components/header/Header';
import Mainside from '../components/mainside/Mainside';
import EditMission from '../components/modal/EditMission';
import OrganizationVisionEditModal from '../components/organization_vision/org_edit_vision/modal/EditOrgVisionModal';


function App() {
  return (
    <>
      <SimpleModal />
      <Deletemodal />
      <BasicModal />
      <DeleteSuccessModal />
      <DeleteErrorModal/>
      <OrganizationVisionEditModal />
      <SnackBar />
      <PluginSide>
        <MissionVisionContainer />
        <Mainside />
        <EditMission />
        <ExportReport />
      </PluginSide>
    </>
  );
}

export default App;

const PluginSide = styled.div`
  width: 100%;
  background-color: #f6f6f6;
  border: 1px solid red;
  padding-bottom: 20px;
`;
