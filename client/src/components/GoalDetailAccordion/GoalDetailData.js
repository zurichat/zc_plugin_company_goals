import React from 'react';
import { Box } from '@material-ui/core';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import data from './GoalData';

import { Div, Text, Button } from './GoalDetail.styled';

const GoalDetailData = ({ goalData }) => {
  return (
    <React.Fragment>
      <Div>
        <Text primary> Goal Name</Text>
        <Text> Wireframe </Text>
        <Text primary> Category</Text>
        <Text>Product Design</Text>
        <Text primary>Timeline </Text>
        <Text>Sept 20 - Oct 31</Text>
        <Text primary>Priority</Text>
        <Text>
          <Box>
            <StarBorderIcon />
            <StarBorderIcon />
            <StarBorderIcon />
            <StarBorderIcon />
          </Box>
        </Text>
        <Text primary>Goal Progress</Text>
        <Text>
          <Box>
            <Button
              width="47px"
              fontSize="10px"
              lineHeight="28px"
              background="#ebebeb"
              color="#00b876"
              padding="3px 14.69px"
            >
              Yes
            </Button>
            <Button
              width="47px"
              fontSize="10px"
              lineHeight="28px"
              background="#ebebeb"
              marginLeft="17px"
              padding="3px 14.69px"
            >
              No
            </Button>
          </Box>
        </Text>
        <Text primary>Goal Description</Text>
        <Text>Create a Wirefrane for a goal plug In</Text>
        <Button
          width="143px"
          height="48px"
          fontSize="15px"
          lineHeight="24px"
          background="#00b876"
          color="primary"
          padding="12px 53px"
          marginTop="31.58px"
        >
          close
        </Button>
      </Div>
    </React.Fragment>
  );
};

export default GoalDetailData;
