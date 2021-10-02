import AppHeader from '../components/app_header/AppHeader';
import React from 'react';
import Header from '../components/organization_mission_vision/OrganizationMissionVision';
import EditMission from '../components/modal/EditMission';
import FaqsContainer from '../containers/Faqs';
import OrganizationVisionEditModal from '../components/organization_vision/org_edit_vision/modal/EditOrgVisionModal';

const Faqs = () => {
  return (
    <>
      <AppHeader />
      <div>
        <Header />
        <FaqsContainer />
        <EditMission />
      </div>
    </>
  );
};

export default Faqs;
