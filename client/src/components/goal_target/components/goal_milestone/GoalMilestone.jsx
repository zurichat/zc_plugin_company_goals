import {
  GoalMilestoneContainer,
  MilestoneContainer,
  MilestoneCount,
  MilestoneTextField,
  MilestoneTextFieldContainer,
  RemoveMilestoneButton,
} from './GoalMilestone.styled';
import RemoveIcon from '@mui/icons-material/Remove';
import GoalNumberMilestone from '../goal_number_milestone/GoalNumberMilestone';

const GoalMilestone = ({ displayMilestone }) => {
  return (
    <GoalMilestoneContainer>
      {displayMilestone === 'number' ? <GoalNumberMilestone /> : <p>ddd</p>}
    </GoalMilestoneContainer>
  );
};

export default GoalMilestone;
