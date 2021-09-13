import React from 'react';
import styled from 'styled-components';

function UnarchiveModal() {
  return (
    <Container>
      <CloseButton>x</CloseButton>
      <Heading>Unarchive Goals</Heading>
      <Description>Click the button to go back to main dashboard.</Description>
      <ProceedButton>Proceed</ProceedButton>
    </Container>
  );
}

const Container = styled.div`
  max-width: 70%;
  height: 350px;
  font-family: 'Lato';
  box-shadow: 0 2px 3px #ccc;
  background-color: #fff;
  margin: 20px auto;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  font-size: 15px;
  top: 20px;
  right: 20px;
  color: #00b87c;
  background: none;
  border: none;
  cursor: pointer;
`;

const Heading = styled.h2`
  font-size: 28px;
  line-height: 29px;
  color: #3a3a3a;
  margin-bottom: 20px;
`;

const Description = styled.p`
  color: #393939;
  font-size: 12px;
  margin-bottom: 35px;
`;

const ProceedButton = styled.button`
  background-color: #00b87c;
  color: #fff;
  padding: 12px 16px;
  border: none;
  border-radius: 5px;
  width: 150px;
  margin: 0 auto;
  cursor: pointer;
`;

export default UnarchiveModal;
