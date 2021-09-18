import React from 'react';
import { EmptyGoalContainer, EmptyGoalText, EmptyGoalButton } from './EmptyGoal.styled';

const EmptyGoal = () => {
  return (
    <EmptyGoalContainer>
      <EmptyGoalText>This space is empty. Create a goal to get started</EmptyGoalText>
      <EmptyGoalButton type="button">Create Goal</EmptyGoalButton>
    </EmptyGoalContainer>
  );
};

export default EmptyGoal;
