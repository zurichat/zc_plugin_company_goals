import React from 'react';

import data from './GoalData';

import { Div, Text } from './GoalDetail.styled';

const GoalDetailData = () => {
  return (
    <Div>
      <Text primary> {data.Goals.Goal_Name} </Text>
      <Text> abdullah </Text>
      <Text primary> {data.Goals.Goal_Name} </Text>
      <Text> abdullah </Text>
      <Text primary> {data.Goals.Goal_Name} </Text>
      <Text> abdullah </Text>
      <Text primary> {data.Goals.Goal_Name} </Text>
      <Text> abdullah </Text>
    </Div>
  );
};

export default GoalDetailData;
