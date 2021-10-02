import AppHeader from '../components/app_header/AppHeader';
import React from 'react';
import MissionVisionContainer from '../components/organization_mission_vision/OrganizationMissionVision';
import FaqsContainer from '../containers/Faqs';

const Faqs = () => {
  return (
    <>
      <AppHeader />
      <div>
        <MissionVisionContainer />
        <FaqsContainer />
      </div>
    </>
  );
};

export default Faqs;
