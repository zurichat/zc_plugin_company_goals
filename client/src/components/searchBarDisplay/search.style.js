import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  width: 230px;
  height: 249px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

export const Text = styled.p`
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #bdbdbd;
`;
