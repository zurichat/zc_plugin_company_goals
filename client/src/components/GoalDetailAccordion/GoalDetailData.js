import React from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { openModal } from '../../redux/TargetModalSlice';
import data from './GoalData';

import { Div, Text, Button } from './GoalDetail.styled';
import { makeStyles } from '@mui/material';

const GoalDetailData = ({ goalData }) => {
  const dispatch = useDispatch();

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
              width="16px"
              fontSize="10px"
              borderRadius="3px"
              background="#ebebeb"
              padding="3px 5px"
              color="#8d8d8d"
            >
              1
            </Button>
            <Button
              width="16px"
              fontSize="10px"
              borderRadius="3px"
              background="#ebebeb"
              padding="3px 5px"
              color="#8d8d8d"
              marginLeft="15px"
            >
              2
            </Button>
            <Button
              width="16px"
              fontSize="10px"
              borderRadius="3px"
              background="#ebebeb"
              padding="3px 5px"
              color="#8d8d8d"
              marginLeft="15px"
            >
              3
            </Button>
            <Button
              width="16px"
              fontSize="10px"
              borderRadius="3px"
              background="#ebebeb"
              padding="3px 5px"
              color="#8d8d8d"
              marginLeft="15px"
              marginBottom="29px"
            >
              4
            </Button>
          </Box>
        </Text>
        <Text primary>Goal Description</Text>
        <Text>Create a Wireframe for a goal plug In</Text>

        {/* <Text primary> {goalData.goal_name} </Text>
        <Text> org goals </Text> */}

        {/* <Button
          width="143px"
          fontSize="15px"
          font-weight="700"
          borderRadius="3px"
          background="#00B87C"
          padding="12px 35px"
          color="#ffffff"
          marginLeft="0px 0px"
          onClick={() => dispatch(openModal())}
        >
          Create Target
        </Button> */}
      </Div>
    </React.Fragment>
  );
};

export default GoalDetailData;
