import React from 'react';
import { Box } from '@material-ui/core';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import data from './GoalData';

import { Div, Text } from './GoalDetail.styled';

const GoalDetailData = ({ goalData }) => {
  return (
    <Div>
      <Text primary>Goal Name</Text>
      <Text> Wireframe </Text>
      <Text primary>Category</Text>
      <Text>Product Design</Text>
      <Text primary>TimeLine</Text>
      <Text>Sept 20 - Oct 31</Text>
      <Text primary>Priority</Text>
      <Text>
        <Box>
          <StarBorderIcon />
          <StarBorderIcon />
          <StarBorderIcon />
          <StarBorderIcon />
          <StarBorderIcon />
        </Box>
      </Text>
      <Text primary>Goal Progress</Text>
      <Text>Radio buttons</Text>
      <Text primary>Create a Wireframe for a goal plugin</Text>
    </Div>
  );
};

export default GoalDetailData;
