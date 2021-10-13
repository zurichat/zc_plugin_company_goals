import styled from 'styled-components';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';

const SelectTargetTypeRadioInputContainer = styled.div`
  /* border: 1px solid purple; */
  flex-basis: 60%;
  text-align: center;
  color: ${(props) => (props.isSelected ? '#00b87c' : 'rgba(176, 175, 176, 1)')};
  text-transform: capitalize;

  & > .MuiButtonBase-root.MuiRadio-root.Mui-checked {
    color: #00b87c;
  }
`;

const SelectTargetTypeRadioInput = styled(Radio)``;

const SelectTargetTypeRadioInputLabel = styled(Typography)`
  && {
    font-size: 0.937rem;
    font-weight: 500;
    line-height: 1.125rem;
  }
`;
const SelectTargetTypeRadioInputLabelDescription = styled(Typography)`
  && {
    font-weight: 0.812rem;
    line-height: 0.976rem;
  }
`;

export {
  SelectTargetTypeRadioInputContainer,
  SelectTargetTypeRadioInput,
  SelectTargetTypeRadioInputLabel,
  SelectTargetTypeRadioInputLabelDescription,
};
