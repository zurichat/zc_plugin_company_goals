/* eslint-disable import/order */
import styled from 'styled-components';
import SnackBar from '../components/snackbar/Snackbar';
import SimpleModal from '../components/create_goal/CreateGoal';
import Deletemodal from '../components/Deletemodal/Deletemodal';
import DeleteSuccessModal from '../components/DeleteSuccess/DeleteSuccessModal';
import BasicModal from '../components/EditGoal/EditGoal';
import MissionVisionContainer from '../components/header/Header';
import EditMission from '../components/modal/EditMission';
import Mainside from '../components/mainside/Mainside';
import ExportReport from '../components/modal/ExportReport';
//import EditMission from '../components/modal/EditMission';
import OrganizationVisionEditModal from '../components/organization_vision/org_edit_vision/modal/EditOrgVisionModal';

function App() {
  return (
    <>
      <SimpleModal />
      <Deletemodal />
      <BasicModal />
      <DeleteSuccessModal />
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
