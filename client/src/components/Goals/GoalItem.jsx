/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Container, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import dislikes from '../../Images/png/dislikes.png';
import ellipsis from '../../Images/png/ellipsis.png';
import likes from '../../Images/png/likes.png';
import views from '../../Images/png/views.png';
import { getGoals } from '../../redux/showGoalSlice';
import { addLike, addDisLike } from '../../redux/likeGoalSlice';
import EmptyGoal from '../empty-goal-interface/EmptyGoal';
import {
  useStyles,
  GoalTitle,
  GoalTagsContainer,
  GoalTags,
  ProgressBar,
  ProgressRate,
  ProgressDate,
  IconItemContainer,
  IconItemCount,
  Likes,
  MoreOptions,
  ProgressDetailsContainer,
} from './GoalItem.style';
import GoalDetailAccordion from '../GoalDetailAccordion/GoalDetails';

const GoalItem = ({ goalData }) => {
  const classes = useStyles();
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

  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals.list);
  const status = useSelector((state) => state.goals.status);
  const goalLikes = useSelector((state) => state.likeGoals.likes);
  const goalDislikes = useSelector((state) => state.likeGoals.dislikes);
  const errorMessage = useSelector((state) => state.goals.errorMessage);

  const likeGoal = () => {
    dispatch(addLike(1));
  };
  const disLikeGoal = () => {
    dispatch(addDisLike(1));
  };
  const Progress = ((goalData.milestone1 + goalData.milestone2 + goalData.milestone3) / 30) * 100;
  const goalStart = new Date(goalData.goal_start);
  const goalEnd = new Date(goalData.goal_end);
  const startMonth = month.month_names_short[goalStart.getMonth()];
  const startDate = goalStart.getDate();
  const endMonth = month.month_names_short[goalEnd.getMonth()];
  const endDate = goalEnd.getDate();
  return (
    <Container className={classes.root} key={goalData.room_id}>
      <Grid item xs={12} sm={3} className={classes.rightSpacing}>
        <GoalTitle>{goalData.goal_name ? goalData.goal_name : 'No name'}</GoalTitle>
        <GoalTagsContainer>
          <GoalTags>{goalData.category ? goalData.category : 'No category'}</GoalTags>
        </GoalTagsContainer>
      </Grid>

      <Grid item xs={12} sm={6}>
        <ProgressBar variant="determinate" value={Progress ? Progress : 0} />
        <ProgressDetailsContainer>
          <ProgressRate>Progress Rate: {Progress ? Progress : 0}%</ProgressRate>
          <ProgressDate>
            {goalData.goal_start && goalData.goal_end
              ? `${startMonth} ${startDate} - ${endMonth} ${endDate}`
              : 'No date set'}
            {/* {startMonth} {startDate} - {endMonth} {endDate} */}
          </ProgressDate>
        </ProgressDetailsContainer>
      </Grid>

      <Grid item xs={12} sm={3} className={classes.icons}>
        <IconItemContainer>
          <img src={views} alt="views-icon" className={classes.iconImages} />
          <IconItemCount>66</IconItemCount>
        </IconItemContainer>
        <IconItemContainer>
          <img src={likes} alt="likes-icon" className={classes.iconImages} onClick={likeGoal} />
          <IconItemCount>{goalLikes}</IconItemCount>

          <Likes>
            <img src={likes} alt="likes-icon" className={classes.iconImages} />
            <IconItemCount>8</IconItemCount>
          </Likes>
        </IconItemContainer>
        <IconItemContainer>
          <img src={dislikes} alt="dislikes-icon" className={classes.iconImages} onClick={disLikeGoal} />
          <IconItemCount>{goalDislikes}</IconItemCount>
        </IconItemContainer>
      </Grid>

      <MoreOptions>
        <img src={ellipsis} alt="more-options-icon" />
      </MoreOptions>
    </Container>
  );
};
export default GoalItem;
