import React from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import StarIcon from '@mui/icons-material/Star';
import { openModal } from '../../redux/TargetModalSlice';
import data from './GoalData';

import { Div, Text, Button } from './GoalDetail.styled';
import { makeStyles } from '@material-ui/core';

const GoalDetailData = ({ goalData }) => {
  const dispatch = useDispatch();
  const month = {
    month_names: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  };

  // const Progress = Math.floor(goalData.progress ? goalData.progress : 0);
  const goalStart = new Date(goalData.start_date);
  const goalEnd = new Date(goalData.due_date);
  const startMonth = month.month_names_short[goalStart.getMonth()];
  const startDate = goalStart.getDate();
  const endMonth = month.month_names_short[goalEnd.getMonth()];
  const endDate = goalEnd.getDate();

  const useStyles = makeStyles({
    icon: {
      color: '#bdbdbd',
    },
  });

  const classes = useStyles();

  return (
    <React.Fragment>
      <Div>
        <Text primary> Goal Name</Text>
        <Text>{goalData.goal_name ? goalData.goal_name : 'No name'} </Text>
        <Text primary> Category</Text>
        <Text>Product design</Text>
        <Text primary>Timeline </Text>
        <Text>
          {goalData.start_date && goalData.due_date
            ? `${startMonth} ${startDate} - ${endMonth} ${endDate}`
            : 'No date set'}
        </Text>
        <Text primary>Priority</Text>
        <Text>
          <Box>
            <StarIcon className={classes.icon} />
            <StarIcon className={classes.icon} />
            <StarIcon className={classes.icon} />
            <StarIcon className={classes.icon} />
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

        {/* <Text primary>{goalData.goal_name} </Text>
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
