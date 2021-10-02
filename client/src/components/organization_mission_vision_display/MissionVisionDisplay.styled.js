import TextField from '@mui/material/TextField';
import styled from 'styled-components';

const MissionVisionDisplayContainer = styled.div`
  /* border: 1px solid blue; */
  margin-bottom: 1rem;
  @media (min-width: 600px) {
    flex-basis: 47%;
  }
`;

const MissionVisionDisplayField = styled(TextField)`
  width: 100%;
  & .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root {
    font-weight: 900;
  }
  & .css-17mclh2-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #00b87c;
  }
  & > label.css-1kty9di-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
    color: #00b87c;
  }
  & > .css-1kty9di-MuiFormLabel-root-MuiInputLabel-root.Mui-disabled {
    color: black;
  }
  & textarea.css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled {
    -webkit-text-fill-color: black;
    color: black;
  }
`;

export const ParentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: left;
  width: 49%;

  @media only screen and (max-width: 760px) {
    width: 98%;
  }
  @media only screen and (max-width: 425px) {
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Editbutton = styled.button`
  border: none;
  background-color: #ffffff;
  padding: 21px 22px 22px;
  cursor: pointer;
  border-top: 2px solid #eee3e3;

  @media only screen and (max-width: 760px) {
  }
`;
export const CollapseButton = styled.button`
  width: 60px;
  height: 48px;
  color: #fff;
  border: none;
  background: ${(props) => props.bgColor};
  cursor: pointer;
`;
export const Title = styled.h3`
  font-family: 'Lato';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: #000000;
  margin: 0;

  @media only screen and (max-width: 760px) {
  }
`;
export const MissionField = styled.p`
  border: none;
  background-color: white;
  border-radius: 3px 0 0 3px;
  padding: 21px 15px;
  width: 100%;
  border-top: 2px solid #eee3e3;
  &:-ms-keyboard-active {
    border-style: none;
  }

  @media only screen and (max-width: 760px) {
  }
  @media only screen and (max-width: 425px) {
  }
`;

export { MissionVisionDisplayContainer, MissionVisionDisplayField };
