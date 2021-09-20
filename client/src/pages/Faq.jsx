import React from 'react';
import Header from '../components/header/Header';
import EditMission from '../components/Modal/EditMission';
import FaqsContainer from '../containers/Faqs';

const Faqs = () => {
  return (
    <div>
      <Header />
      <FaqsContainer />
      <EditMission />
    </div>
  );
};

export default Faqs;
