import TextField from '@mui/material/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

const GoalMilestoneContainer = styled.div`
  margin-top: 1.51rem;
  margin-bottom: 2rem;
`;

const MilestoneContainer = styled.div`
  /* border: 1px solid blue; */
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const MilestoneCount = styled.div`
  border: 1px solid #a1a1a1;
  flex-basis: 11%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;

const MilestoneTextFieldContainer = styled.div`
  /* border: 1px solid gainsboro; */
  flex-basis: 73%;
`;

const MilestoneTextField = styled(TextField)``;

const RemoveMilestoneButton = styled(IconButton)`
  flex-basis: 11%;
  border: 1px solid #a1a1a1;
  border-radius: inherit;
`;

const AddAMilestoneContainer = styled.div``;
const AddAMilestoneButton = styled(IconButton)``;
const AddAMilestoneText = styled(Typography)``;

export {
  GoalMilestoneContainer,
  MilestoneContainer,
  MilestoneCount,
  MilestoneTextFieldContainer,
  MilestoneTextField,
  RemoveMilestoneButton,
  AddAMilestoneContainer,
  AddAMilestoneButton,
  AddAMilestoneText,
};
