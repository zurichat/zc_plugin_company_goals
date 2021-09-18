/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { Container,Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import dislikes from '../../Images/png/dislikes.png'
import ellipsis from '../../Images/png/ellipsis.png'
import likes from '../../Images/png/likes.png'
import views from '../../Images/png/views.png'
import { getGoals } from '../../redux/showGoalSlice';
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
    

  useEffect(() => {
    console.log('always');
      dispatch(getGoals()).catch(obj => {
        console.log('Shite!')
      });
    }, [dispatch]);

  const hasGoal = goals.data ? 1 : 0;
  return (
    <>
      {status === 'success' && !hasGoal ? <div><EmptyGoal /></div> : status === 'success' &&
      hasGoal && goals.data.map(goal => {
          const Progress = ((goal.milestone1 + goal.milestone2 + goal.milestone3) / 30) * 100;
          const goalStart = new Date(goal.goal_start);
        const goalEnd = new Date(goal.goal_end);
        const startMonth = month.month_names_short[goalStart.getMonth()];
        const startDate = goalStart.getDate();
        const endMonth = month.month_names_short[goalEnd.getMonth()];
        const endDate = goalEnd.getDate();
        

          return (
            <Container className={classes.root} key={goal._id}>
              <Grid item xs={12} sm={3} className={classes.rightSpacing}>
                <GoalTitle>{goal.goal_name ? goal.goal_name : 'No name'}</GoalTitle>
                <GoalTagsContainer>
                  <GoalTags>{goal.category ? goal.category : 'No category'}</GoalTags>
                </GoalTagsContainer>
              </Grid>

              <Grid item xs={12} sm={6}>
                <ProgressBar variant="determinate" value={Progress ? Progress : 0} />
                <ProgressDetailsContainer>
                  <ProgressRate>Progress Rate: {Progress ? Progress : 0}%</ProgressRate>
                  <ProgressDate>
                    {goal.goal_start && goal.goal_end
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
                  <Likes>
                    <img src={likes} alt="likes-icon" className={classes.iconImages} />
                    <IconItemCount>8</IconItemCount>
                  </Likes>
                </IconItemContainer>
                <IconItemContainer>
                  <img src={dislikes} alt="dislikes-icon" className={classes.iconImages} />
                  <IconItemCount>8</IconItemCount>
                </IconItemContainer>
              </Grid>

              <MoreOptions>
                <img src={ellipsis} alt="more-options-icon" />
              </MoreOptions>
            </Container>
          );
        })}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && (
        <p>
          {/* A button might be here to retry and this errorMessage will be in the error UI */}
          {errorMessage}
        </p>
      )}
    </>
  );
}

export default GoalItem
