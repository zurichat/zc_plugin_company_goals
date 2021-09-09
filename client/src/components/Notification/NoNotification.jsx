import React from 'react';

import styled from 'styled-components';

import noImage from '../../Images/png/g1632.png';

const Section = styled.section`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 352px;
  height: 295px;
  flex-direction: column;
  font-weight: 400;
  font-size: 13px;
  color: #999999; ;
`;

const NoNotification = () => {
  return (
    <Section>
      <img src={noImage} alt="" />
      <p>You have no notification</p>
    </Section>
  );
};

export default NoNotification;
