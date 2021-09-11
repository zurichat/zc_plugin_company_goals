import React from 'react'

import { Container,Grid } from '@material-ui/core'

import dislikes from '../../Images/png/dislikes.png'
import ellipsis from '../../Images/png/ellipsis.png'
import likes from '../../Images/png/likes.png'
import views from '../../Images/png/views.png'
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

const GoalItem = () => {
  const classes = useStyles();
  return (
      <Container className={classes.root} maxWidth="lg">
        <Grid item xs={12} sm={3}>
          <GoalTitle>Create WireFrame</GoalTitle>
          <GoalTagsContainer>
            <GoalTags># ui/ux</GoalTags>
            <GoalTags># mobile</GoalTags>
          </GoalTagsContainer>
        </Grid>

        <Grid item xs={12} sm={6}>
          <ProgressBar variant="determinate" value={73} />
          <ProgressDetailsContainer>
            <ProgressRate>Progress Rate: 73%</ProgressRate>
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
          <img src={ellipsis} alt="more-options-icon" />
        </MoreOptions>
      </Container>
  );
}

export default GoalItem
