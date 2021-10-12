import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@material-ui/core/Button';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';

const GoalTargetDialog = styled(Dialog)`
  & .MuiDialog-paper {
    width: 100%;
    border-radius: 10px;
    margin: 0;
  }
  & .MuiDialogContent-root {
    padding: 0;
  }
  @media (min-width: 18.75rem) {
    & .MuiDialog-paper {
      max-width: 100%;
      width: 94%;
    }
  }
  @media (min-width: 23.75rem) {
    & .MuiDialog-paper {
      width: 36.32rem;
    }
  }
`;

const GoalTargetFormActionButton = styled(IconButton)``;

const GoalTargetFormTitle = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;

  && {
    /* font-family: Lato; */
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.125rem;
    letter-spacing: 0em;
  }
`;

const GoalTargetFormContentContainer = styled(DialogContent)`
  && {
    padding: 0 1.5rem 0 1.5rem;
  }
`;

const GoalTargetFormDescription = styled(Typography)`
  color: rgba(139, 139, 139, 1);
  /* border: 1px solid blue; */
  padding-bottom: 0.73rem;
  && {
    /* font-family: Lato; */
    font-size: 0.937rem;
    line-height: 1.22rem;
  }
`;

const GoalTargetTypeTitle = styled(Typography)`
  text-transform: capitalize;
  /* border: 1px solid green; */
  && {
    font-size: 0.937rem;
    line-height: 1.22rem;
    font-weight: 500;
    margin: 1.23rem 0;
  }
`;

const GoalTargetTypeDescription = styled(Typography)`
  color: rgba(153, 153, 153, 1);
  && {
    font-size: 0.812rem;
    font-weight: 400;
    line-height: 0.976rem;
    margin-bottom: 1.19rem;
  }
`;

const GoalTargetRadioGroup = styled(RadioGroup)`
  && {
    flex-flow: row nowrap;
  }
`;

const GoalTargetSubmitButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const GoalTargetSubmitButton = styled(Button)`
  && {
    background-color: #00b87c;
    border: none;
    border-radius: 3px;
    color: #fff;
    outline: none;
    padding: 1rem 2.5rem;
    font-size: 12px;
    cursor: pointer;
  }
`;

export {
  GoalTargetDialog,
  GoalTargetFormTitle,
  GoalTargetFormActionButton,
  GoalTargetFormContentContainer,
  GoalTargetFormDescription,
  GoalTargetTypeTitle,
  GoalTargetTypeDescription,
  GoalTargetRadioGroup,
  GoalTargetSubmitButtonContainer,
  GoalTargetSubmitButton,
};
