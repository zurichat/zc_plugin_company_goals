import AppHeader from '../components/app_header/AppHeader';
import React from 'react';
import Header from '../components/header/Header';
import EditMission from '../components/modal/EditMission';
import FaqsContainer from '../containers/Faqs';

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
