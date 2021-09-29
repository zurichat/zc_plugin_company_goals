import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const TatgetContainer = styled.div`
  display: flex;
`;
export const Label = styled.label`
  display: block;
  width: 100%;
  text-align: center;
  padding-bottom: .1rem;

  border-radius: 3px;
  &:before {
    content: ' ';
    display: inline-block;
    position: relative;
    top: 0.4rem;
    right: 1.39rem;
    margin: 0 8px 1px 0;
    width: 10px;
    height: 10px;
    border-radius: 11px;

    background-color: transparent;
  }
`;
export const RadioLabel = styled.div`
  text-align: center;
  margin-bottom: 3px;
  margin-top: 5px;
`;

export const LabelTitle = styled.h6`
  font-size: 13px;
  color: #b0afb0;
  width: 70%;
  margin: 0;
`;

export const LabelBody = styled.p`
  color: #b0afb0;
  font-size: 13px;
  width: 70%;
  margin: 0;
`;
export const Input = styled.input`
  box-sizing: border-box;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: white;
  border: 1px solid grey;
  outline: none;
  width: 15px;
  height: 15px;
  cursor: pointer;
  position: relative;
  display: flex;
  margin-left: 3.15rem;
  margin-bottom: -1.45rem;
  border-radius: 50%;
  &:checked {
    border: 1px solid #00b87c;
  }
  &:checked + ${Label} {
    ${RadioLabel} {
      h6,
      p {
        color: #00b87c !important;
      }
    }
  }
  &:checked + ${Label}:before {
    background-color: #00b87c;
    border: 0.5px solid #00b87c;
    padding: 0.1rem;
  }
`;
// #00b87c
export const TargetDiv = styled.div`
  margin-top: 1rem;
  width: 50% !important;
  text-align: end;
  @media only screen and (max-width: 600px) {
    ${Label}:before {
      top: 0.3rem !important;
      left: -1.15rem !important;
    }
  }
`;
