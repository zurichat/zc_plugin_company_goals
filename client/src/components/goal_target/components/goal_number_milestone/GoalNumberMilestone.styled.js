import TextField from '@mui/material/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

const GoalNumberMilestoneContainer = styled.div`
  /* border: 1px solid blue; */
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const GoalNumberMilestoneCount = styled.div`
  border: 1px solid #a1a1a1;
  flex-basis: 11%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;

const GoalNumberMilestoneTextFieldContainer = styled.div`
  /* border: 1px solid gainsboro; */
  flex-basis: 73%;
`;

const GoalNumberMilestoneTextField = styled(TextField)``;

const GoalNumberRemoveMilestoneButton = styled(IconButton)`
  flex-basis: 11%;
  border: 1px solid #a1a1a1;
  border-radius: inherit;
`;

const GoalNumberAddAMilestoneContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-top: 0.84rem;
`;
const GoalNumberAddAMilestoneButton = styled(IconButton)`
  &.MuiIconButton-root {
    padding: 0;
    color: #00b87c;
  }
`;
const GoalNumberAddAMilestoneText = styled(Typography)`
  color: #00b87c;
  && {
    font-size: 0.937rem;
    font-weight: 400;
    line-height: 1.125rem;
    margin-left: 0.42rem;
  }
`;

export {
  GoalNumberMilestoneContainer,
  GoalNumberMilestoneCount,
  GoalNumberMilestoneTextFieldContainer,
  GoalNumberMilestoneTextField,
  GoalNumberRemoveMilestoneButton,
  GoalNumberAddAMilestoneContainer,
  GoalNumberAddAMilestoneButton,
  GoalNumberAddAMilestoneText,
};
