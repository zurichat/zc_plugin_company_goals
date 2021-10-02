import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/TargetModalSlice';

import data from './GoalData';

import { Div, Text, Button } from './GoalDetail.styled';

const GoalDetailData = ({ goalData }) => {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Div>
        <Text primary> {goalData.goal_name} </Text>
        <Text> org goals </Text>
        <Button onClick={() => dispatch(openModal())}>Create Target</Button>
      </Div>
    </React.Fragment>
  );
};

export default GoalDetailData;
