import React from 'react';
import Header from '../components/header/Header';
import EditMission from '../components/modal/EditMission';
import FaqsContainer from '../containers/Faqs';
import OrganizationVisionEditModal from '../components/organization_vision/org_edit_vision/modal/EditOrgVisionModal';


const Faqs = () => {
  return (
    <div>
      <Header />
      <FaqsContainer />
      <EditMission />
      <OrganizationVisionEditModal />

    </div>
  );
};

export default Faqs;
