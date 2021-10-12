import { useDispatch, useSelector } from 'react-redux';
import {
  GoalTargetDialog,
  GoalTargetFormActionButton,
  GoalTargetFormContentContainer,
  GoalTargetFormTitle,
  GoalTargetFormDescription,
  GoalTargetTypeTitle,
  GoalTargetTypeDescription,
  GoalTargetRadioGroup,
  GoalTargetSubmitButtonContainer,
  GoalTargetSubmitButton,
} from './GoalTarget.styled';
import CloseIcon from '@mui/icons-material/Close';
import { toggleShowOrganizationGoalTargetForm } from '../../redux/organizationGoalTarget.slice';
import SelectTargetType from './components/select_target_type_radio_input/SelectTargetTypeRadioInput';
import { useState } from 'react';
import GoalMilestone from './components/goal_milestone/GoalMilestone';

const GoalTarget = () => {
  const dispatch = useDispatch();
  const { showGoalTargetModal } = useSelector((state) => state.organizationGoalTarget);
  const [targetRadioData] = useState([
    {
      radioValue: 'number',
      label: 'number',
      labelDescription: '(Any number Like 1, 10,000 etc)',
      radioName: 'target-type-radio',
    },
    {
      radioValue: 'logical',
      label: 'logical',
      labelDescription: '(Like “Done or Undone”)',
      radioName: 'target-type-radio',
    },
  ]);
  const [checkedRadioValue, setCheckedRadioValue] = useState(targetRadioData[0].radioValue);
  const handleTargetChange = (evt) => {
    setCheckedRadioValue(evt.target.value);
  };
  return (
    <GoalTargetDialog open={showGoalTargetModal}>
      <GoalTargetFormTitle>
        Create a new target
        <GoalTargetFormActionButton aria-label="close" onClick={() => dispatch(toggleShowOrganizationGoalTargetForm())}>
          <CloseIcon />
        </GoalTargetFormActionButton>
      </GoalTargetFormTitle>
      <GoalTargetFormContentContainer>
        <GoalTargetFormDescription>
          Targets help you specify a means of completing a goal ,they are quatifiable(numerical)
        </GoalTargetFormDescription>
        <GoalTargetTypeTitle component="h3">target type</GoalTargetTypeTitle>
        <GoalTargetTypeDescription>&#40;For your goal milestone measurement&#41;</GoalTargetTypeDescription>
        <GoalTargetRadioGroup
          aria-label="target-type"
          name="target-type-radio-group"
          value={checkedRadioValue}
          onChange={handleTargetChange}
        >
          {targetRadioData.map((targetData, idx) => (
            <SelectTargetType
              key={`${targetData.label}-${idx * (3 / 0.3)}`}
              radioValue={targetData.radioValue}
              label={targetData.label}
              labelDescription={targetData.labelDescription}
              isSelected={checkedRadioValue === targetData.radioValue}
            />
          ))}
        </GoalTargetRadioGroup>
        <GoalMilestone displayMilestone={checkedRadioValue} />
        <GoalTargetSubmitButtonContainer>
          <GoalTargetSubmitButton>create target</GoalTargetSubmitButton>
        </GoalTargetSubmitButtonContainer>
      </GoalTargetFormContentContainer>
    </GoalTargetDialog>
  );
};

export default GoalTarget;
