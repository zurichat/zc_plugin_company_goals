/* eslint-disable import/order */
import styled from 'styled-components';
import MainNav from '../components/MainNav/MainNav';
import SnackBar from '../components/snackbar/Snackbar';
import SimpleModal from '../components/create_goal/CreateGoal';
import Deletemodal from '../components/Deletemodal/Deletemodal';
import DeleteSuccessModal from '../components/DeleteSuccess/DeleteSuccessModal';
import BasicModal from '../components/EditGoal/EditGoal';
import MissionVisionContainer from '../components/header/Header';
import EditMission from '../components/Modal/EditMission'
import Mainside from '../components/mainside/Mainside';
<<<<<<< HEAD
import ExportReport from '../components/Modal/ExportReport';
=======
import ExportReport from '../components/modal/ExportReport'
>>>>>>> 71f048bd9a77eb1a97f0ef86d66984752f5f7c9c
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
        <MainNav />
        <MissionVisionContainer />
        <Mainside />
<<<<<<< HEAD
        <ExportReport />
        {/* <EditMission /> */}
=======
        <EditMission />
        <ExportReport/>
>>>>>>> 71f048bd9a77eb1a97f0ef86d66984752f5f7c9c
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
