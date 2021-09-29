import React from 'react';

import data from './GoalData';

import { Div, Text } from './GoalDetail.styled';

const GoalDetailData = ({ goalData }) => {
  return (
    <Div>
      <Text primary> {goalData.goal_name} </Text>
      <Text> org goals </Text>
    </Div>
  );
};

export default GoalDetailData;
