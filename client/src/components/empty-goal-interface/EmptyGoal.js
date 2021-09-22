import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleCreateGoalModalAction } from '../../redux/toggleCreateGoalModal.slice';
import { EmptyGoalContainer, EmptyGoalText, EmptyGoalButton } from './EmptyGoal.styled';

const EmptyGoal = () => {
  const dispatch = useDispatch();
  return (
    <EmptyGoalContainer>
      <EmptyGoalText>This space is empty. Create a goal to get started</EmptyGoalText>
      <EmptyGoalButton type="button" onClick={() => dispatch(toggleCreateGoalModalAction())}>
        Create Goal
      </EmptyGoalButton>
    </EmptyGoalContainer>
  );
};

export default EmptyGoal;
