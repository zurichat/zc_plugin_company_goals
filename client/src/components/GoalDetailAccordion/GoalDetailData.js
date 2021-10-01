import React from 'react';

import data from './GoalData';

import { Div, Text, Button } from './GoalDetail.styled';

const GoalDetailData = ({ goalData }) => {
  return (
    <React.Fragment>
    <Div>
      <Text primary> {goalData.goal_name} </Text>
      <Text> org goals </Text>
    </Div>    
    </React.Fragment>
  );
};

export default GoalDetailData;
