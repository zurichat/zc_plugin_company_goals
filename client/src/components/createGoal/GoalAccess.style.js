import styled from 'styled-components';

export const AccessDiv = styled.div`
  width: 80% !important;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: space-between;
`;

export const AcessLabel = styled.label`
  border: 1px solid grey !important;
  border-radius: 8px;
  color: grey;
  display: inline-block;
  outline: none;
  color: grey;
  height: 7.5625rem;
  margin-bottom: -1rem;
  border: none;
  width: 9.625rem;
  background-color: #f6f6f6;
  @media only screen and (max-width: 600px) {
    width: 40% !important;
    font-size: 18px !important;
    div {
      padding: 1.5rem 0;
    }
  }
`;
export const AcessInput = styled.input`
  display: none;
  &:checked + ${AcessLabel} {
    border: 1px solid #00b87c !important;
    color: #00b87c;
  }
`;
export const AccessButton = styled.div`
  height: 100%;

  border-radius: 8px;
  padding: 3rem 0 0 0;
  width: 60%;
  text-align: center;
`;
export const AccessText = styled.h6`
  margin-bottom: 0;
  font-family: Lato;
  font-weight: Bold;
  font-size: 18px;

  @media only screen and(max-width: 500px) {
    font-size: 12px !important;
  }
`;
