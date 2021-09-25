import styled from 'styled-components';

export const Overlay = styled.div`
  width: 1440px;
  height: 1024px;
  background: rgba(64, 79, 74, 0.58);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GenContainer = styled.div`
  width: 485px;
  height: 508px;
  background: #ffffff;
  box-shadow: 1px 1px 44px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;

export const GenErrorModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  margin-bottom: 0;
  align-self: center;
  justify-self: center;
`;

export const ImgContainer = styled.div`
  background: red;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ErrorH1Text = styled.div`
  font-family: Lato;
  font-weight: 700;
  font-style: normal;
  font-size: 24px;
  line-height: 28.8px;
  text-align: center;
  color: #242424;
  width: 54px;
  height: 24px;
  margin-top: 48px;
  margin-bottom: 16px;
`;

export const GenErrorText = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 21px;
  text-align: center;
  color: #616061;
`;

export const GenErrorButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 14px;
  color: white;
  width: 160px;
  border: none;
  height: 38px;
  background: #00b87c;
  border-radius: 3px;
  margin-top: 32px;
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
