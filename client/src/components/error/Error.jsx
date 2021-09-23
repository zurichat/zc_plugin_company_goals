import React from 'react';
import { useDispatch } from 'react-redux';
import Ellipse from './alert-octagon/active.svg';

import styled from 'styled-components';
const Error = ({ errorMessage }) => {
  const dispatch = useDispatch();
  return (
    <ErrorDiv>
      <ImgContainer>
        <img src={Ellipse} alt="" />
      </ImgContainer>
      <ErrorText>{errorMessage}</ErrorText>
      <ErrorButton onClick={() => dispatch(getGoals())}>Retry</ErrorButton>
    </ErrorDiv>
  );
};

export default Error;

const ErrorDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
  align-self: center;
  justify-self: center;
`;

const ImgContainer = styled.div`
  background: red;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ErrorText = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 21px;
  text-align: center;
  color: #616061;
`;

const ErrorButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 18px;
  color: white;
  width: 160px;
  height: 38px;
  background: #00b87c;
  border-radius: 3px;
  margin-bottom: 234px;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  font-family: 'Lato';
  font-style: normal;
  &:hover {
    opacity: 0.8;
  }
`;
