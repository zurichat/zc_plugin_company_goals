import React from 'react';
import Ellipse from './alert-octagon/active.svg';
import {
  Overlay,
  GenContainer,
  GenErrorModalDiv,
  ImgContainer,
  ErrorH1Text,
  GenErrorText,
  GenErrorButton,
} from './GenErrorModal.Styled.js';

const GenErrorModal = () => {
  return (
    <Overlay>
      <GenContainer>
        <GenErrorModalDiv>
          <ImgContainer>
            <img src={Ellipse} alt="error" />
          </ImgContainer>
          <ErrorH1Text>Error</ErrorH1Text>
          <GenErrorText>Action couldn't be completed. Click Ok to go Back</GenErrorText>
          <GenErrorButton>Ok</GenErrorButton>
        </GenErrorModalDiv>
      </GenContainer>
    </Overlay>
  );
};

export default GenErrorModal;
