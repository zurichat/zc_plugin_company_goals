import React, { useEffect, useState } from 'react';

import { Container, Grid } from '@material-ui/core';

import dislikes from '../../Images/png/dislikes.png';
import ellipsis from '../../Images/png/ellipsis.png';
import likes from '../../Images/png/likes.png';
import views from '../../Images/png/views.png';
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
  MoreOptions,
  ProgressDetailsContainer,
} from './GoalItem.style';
import { useDispatch, useSelector } from 'react-redux';
import { getGoals } from '../../redux/showGoalSlice';
import EmptyGoal from '../empty-goal-interface/EmptyGoal';
import GoalDropDown from './GoalDropDown';

const GoalItem = () => {
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
  const errorMessage = useSelector((state) => state.goals.errorMessage);
  const [showDropDown, setDropDown] = useState(false);

  useEffect(() => {
    dispatch(getGoals()).catch((obj) => {
      console.log('Shite!');
    });
  }, [dispatch]);

  const hasGoal = goals.data ? 1 : 0;
  return (
    <>
      <Container className={classes.root} maxWidth="lg">
        <Grid item xs={12} sm={3}>
          {/* This GoalTitle here should be replaced with {goal.goal_name} */}

          <GoalTitle>Create WireFrame</GoalTitle>
          <GoalTagsContainer>
            {/* This GoalTags here should be replaced with {goal.category} */}

            <GoalTags># ui/ux</GoalTags>
            <GoalTags># mobile</GoalTags>
          </GoalTagsContainer>
        </Grid>

        <Grid item xs={12} sm={6}>
          {/* This ProgressBar value here should be replaced with {Progress} */}

          <ProgressBar variant="determinate" value={73} />
          <ProgressDetailsContainer>
            {/* This ProgressRate here should be replaced with {Progress}% */}

            <ProgressRate>Progress Rate: 73%</ProgressRate>

            {/* This ProgressDate here should be replaced with 
                {month.month_names_short[goalStart.getMonth()]} {goalStart.getDate()} - {month.month_names_short[goalEnd.getMonth()]} {goalEnd.getDate()}*/}

            <ProgressDate>Sep 1 - Sep 30</ProgressDate>
          </ProgressDetailsContainer>
        </Grid>

        <Grid item xs={12} sm={3} className={classes.icons}>
          <IconItemContainer>
            <img src={views} alt="views-icon" className={classes.iconImages} />
            <IconItemCount>66</IconItemCount>
          </IconItemContainer>
          <IconItemContainer>
            <img src={likes} alt="likes-icon" className={classes.iconImages} />
            <IconItemCount>8</IconItemCount>
          </IconItemContainer>
          <IconItemContainer>
            <img src={dislikes} alt="dislikes-icon" className={classes.iconImages} />
            <IconItemCount>8</IconItemCount>
          </IconItemContainer>
        </Grid>

        <MoreOptions>
          <img onClick={() => setDropDown(!showDropDown)} src={ellipsis} alt="more-options-icon" />
        </MoreOptions>
        <GoalDropDown show={{ showDropDown, setDropDown }} />
      </Container>
      {status === 'success' && !hasGoal && <EmptyGoal />}
      {status === 'success' &&
        hasGoal &&
        goals.data.map((goal) => {
          const Progress = ((goal.milestone1 + goal.milestone2 + goal.milestone3) / 30) * 100;
          const goalStart = new Date(goal.goal_start);
          const goalEnd = new Date(goal.goal_end);

          return (
            // Add a key of {goal._id} to the container id to avoid unnecessary errors

            <Container className={classes.root} maxWidth="lg">
              <Grid item xs={12} sm={3}>
                {/* This GoalTitle here should be replaced with {goal.goal_name} */}

                <GoalTitle>Create WireFrame</GoalTitle>
                <GoalTagsContainer>
                  {/* This GoalTags here should be replaced with {goal.category} */}

                  <GoalTags># ui/ux</GoalTags>
                  <GoalTags># mobile</GoalTags>
                </GoalTagsContainer>
              </Grid>

              <Grid item xs={12} sm={6}>
                {/* This ProgressBar value here should be replaced with {Progress} */}

                <ProgressBar variant="determinate" value={73} />
                <ProgressDetailsContainer>
                  {/* This ProgressRate here should be replaced with {Progress}% */}

                  <ProgressRate>Progress Rate: 73%</ProgressRate>

                  {/* This ProgressDate here should be replaced with 
                {month.month_names_short[goalStart.getMonth()]} {goalStart.getDate()} - {month.month_names_short[goalEnd.getMonth()]} {goalEnd.getDate()}*/}

                  <ProgressDate>Sep 1 - Sep 30</ProgressDate>
                </ProgressDetailsContainer>
              </Grid>

              <Grid item xs={12} sm={3} className={classes.icons}>
                <IconItemContainer>
                  <img src={views} alt="views-icon" className={classes.iconImages} />
                  <IconItemCount>66</IconItemCount>
                </IconItemContainer>
                <IconItemContainer>
                  <img src={likes} alt="likes-icon" className={classes.iconImages} />
                  <IconItemCount>8</IconItemCount>
                </IconItemContainer>
                <IconItemContainer>
                  <img src={dislikes} alt="dislikes-icon" className={classes.iconImages} />
                  <IconItemCount>8</IconItemCount>
                </IconItemContainer>
              </Grid>

              <MoreOptions>
                <img onClick={() => setDropDown(!showDropDown)} src={ellipsis} alt="more-options-icon" />
              </MoreOptions>
              <GoalDropDown show={showDropDown} />
            </Container>
          );
        })}
      {/* Loading UI should be here */}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && (
        <p>
          {/* A button might be here to retry and this errorMessage will be in the error UI*/}
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default GoalItem;
