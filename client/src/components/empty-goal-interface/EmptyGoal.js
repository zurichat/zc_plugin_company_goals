import React from 'react';
import { EmptyGoalContainer, EmptyImgContainer, EmptyGoalText, EmptyGoalButton } from './EmptyGoal.styled';
import CreateIcon from './icon.svg';

const EmptyGoal = () => {
  return (
    <EmptyGoalContainer>
      <EmptyImgContainer>
        <img src={CreateIcon} alt="create icon" />
      </EmptyImgContainer>
      <EmptyGoalText>This space is empty. Create a goal to get started</EmptyGoalText>
      <EmptyGoalButton type="button">Create Goal</EmptyGoalButton>
    </EmptyGoalContainer>
  );
};

export default EmptyGoal;
