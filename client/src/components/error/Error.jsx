import React from 'react';
import { useDispatch } from 'react-redux';
import { getGoals } from '../../redux/showGoalSlice';
import Ellipse from './alert-octagon/active.svg';
import { ErrorDiv, ImgContainer, ErrorText, ErrorButton } from './Error.styled.js';

const Error = ({ errorMessage }) => {
  const dispatch = useDispatch();
  return (
    <ErrorDiv>
      <ImgContainer>
        <img src={Ellipse} alt="error" />
      </ImgContainer>
      <ErrorText>Error</ErrorText>
      <ErrorButton onClick={() => dispatch(getGoals())}>Retry</ErrorButton>
    </ErrorDiv>
  );
};

export default Error;
