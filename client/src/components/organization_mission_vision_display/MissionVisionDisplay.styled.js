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
  & > label.MuiInputLabel-root.MuiInputLabel-formControl {
    font-weight: 900;
  }
  & .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #00b87c;
  }
  & > label.MuiFormLabel-root.MuiInputLabel-root.Mui-focused {
    color: #00b87c;
  }
  & > .MuiFormLabel-root.MuiInputLabel-root.Mui-disabled {
    color: black;
  }
  & textarea.MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled {
    -webkit-text-fill-color: black;
    color: black;
  }
  & > p.MuiFormHelperText-root {
    text-align: end;
  }
`;

export { MissionVisionDisplayContainer, MissionVisionDisplayField };
