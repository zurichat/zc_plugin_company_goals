import {
  GoalNumberAddAMilestoneButton,
  GoalNumberAddAMilestoneContainer,
  GoalNumberAddAMilestoneText,
  GoalNumberMilestoneContainer,
  GoalNumberMilestoneCount,
  GoalNumberMilestoneTextField,
  GoalNumberMilestoneTextFieldContainer,
  GoalNumberRemoveMilestoneButton,
} from './GoalNumberMilestone.styled';
import RemoveIcon from '@mui/icons-material/Remove';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useEffect, useState } from 'react';

const GoalNumberMilestone = () => {
  const [milestoneData, setMilestoneData] = useState([
    {
      id: 'ff53ef0l1s',
      value: '',
    },
  ]);
  const [addAMilestoneButtonIsDisabled, setAddAMilestoneButtonIsDisabled] = useState(milestoneData.length === 4);
  const [removeAMilestoneButtonIsDisabled, setRemoveAMilestoneButtonIsDisabled] = useState(milestoneData.length === 1);
  const handleAddAMilestone = () => {
    const newMilestone = { id: Date.now().toString(), value: '' };
    setMilestoneData((prevMilestoneData) => [...prevMilestoneData, newMilestone]);
    setRemoveAMilestoneButtonIsDisabled(false);
  };
  const handleRemoveAMilestone = (id) => {
    setMilestoneData(milestoneData.filter((data) => data.id !== id));
    setAddAMilestoneButtonIsDisabled(false);
  };
  useEffect(() => {
    if (milestoneData.length === 4) {
      setAddAMilestoneButtonIsDisabled(true);
    }
    if (milestoneData.length === 1) {
      setRemoveAMilestoneButtonIsDisabled(true);
    }
  }, [milestoneData.length]);
  return (
    <>
      <GoalNumberMilestoneContainer>
        <GoalNumberMilestoneTextField fullWidth margin="normal" />
      </GoalNumberMilestoneContainer>
      {milestoneData.map((milestone, idx) => (
        <GoalNumberMilestoneContainer key={milestone.id}>
          <GoalNumberMilestoneCount>{idx + 1}</GoalNumberMilestoneCount>
          <GoalNumberMilestoneTextFieldContainer>
            <GoalNumberMilestoneTextField fullWidth value={milestone.value} />
          </GoalNumberMilestoneTextFieldContainer>
          <GoalNumberRemoveMilestoneButton
            disabled={removeAMilestoneButtonIsDisabled}
            onClick={() => handleRemoveAMilestone(milestone.id)}
          >
            <RemoveIcon />
          </GoalNumberRemoveMilestoneButton>
        </GoalNumberMilestoneContainer>
      ))}
      <GoalNumberAddAMilestoneContainer>
        <GoalNumberAddAMilestoneButton disabled={addAMilestoneButtonIsDisabled} onClick={handleAddAMilestone}>
          <ControlPointIcon />
        </GoalNumberAddAMilestoneButton>
        <GoalNumberAddAMilestoneText>
          Add More Milestone &#40;you can set up to 4 milestones&#41;
        </GoalNumberAddAMilestoneText>
      </GoalNumberAddAMilestoneContainer>
    </>
  );
};

export default GoalNumberMilestone;
