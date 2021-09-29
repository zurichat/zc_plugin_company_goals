import styled from 'styled-components';

export const ErrorDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  margin-bottom: 0;
  align-self: center;
  justify-self: center;
  @media (max-width: 768px) {
    margin: 0;
  }
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
export const ErrorText = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 21px;
  text-align: center;
  color: #616061;
`;

export const ErrorButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 18px;
  color: white;
  width: 160px;
  border: none;
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
