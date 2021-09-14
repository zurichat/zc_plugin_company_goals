import React from 'react';

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


const GoalItem = (props) => {  
  const classes = useStyles();
  return (
    props.goals.data.map(goal => {
      const Progress = ((goal.milestone1 + goal.milestone2 + goal.milestone3) / 30) * 100;
      const goalStart = new Date(goal.goal_start);
      const goalEnd = new Date(goal.goal_end);
      return (
        <Container className={classes.root} maxWidth="lg" key={goal._id}>
          <Grid item xs={12} sm={3}>
            <GoalTitle>{goal.goal_name}</GoalTitle>
            <GoalTagsContainer>
              <GoalTags>{goal.category}</GoalTags>
              <GoalTags>{goal.category}</GoalTags>
            </GoalTagsContainer>
          </Grid>

          <Grid item xs={12} sm={6}>
            <ProgressBar variant="determinate" value={Progress} />
            <ProgressDetailsContainer>
              <ProgressRate>Progress Rate: {Progress}%</ProgressRate>
              <ProgressDate>
                {month.month_names_short[goalStart.getMonth()]} {goalStart.getDate()}-
                {month.month_names_short[goalEnd.getMonth()]} {goalEnd.getDate()}
              </ProgressDate>
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
            <img src={ellipsis} alt="more-options-icon" />
          </MoreOptions>
        </Container>
      );
    })
  );
};

export default GoalItem;
