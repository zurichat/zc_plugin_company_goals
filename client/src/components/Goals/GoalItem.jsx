import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import dislikes from '../../Images/png/dislikes.png';
import ellipsis from '../../Images/png/ellipsis.png';
import likes from '../../Images/png/likes.png';
import views from '../../Images/png/views.png';
import GoalDropDown from './GoalDropDown';
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








const GoalItem = ({ _id, milestone1, milestone2, milestone3, goal_start, goal_end, category }) => {
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

  const [showDropDown, setDropDown] = useState(false);
  const goalLikes = useSelector((state) => state.likeGoals.likes);
  const goalDislikes = useSelector((state) => state.likeGoals.dislikes);

  const Progress = ((milestone1 + milestone2 + milestone3) / 30) * 100;
  const goalStart = new Date(goal_start);
  const goalEnd = new Date(goal_end);
  const startMonth = month.month_names_short[goalStart.getMonth()];
  const startDate = goalStart.getDate();
  const endMonth = month.month_names_short[goalEnd.getMonth()];
  const endDate = goalEnd.getDate();




  const likeGoal = () => {
    dispatch(addLike(1));
  };
  const disLikeGoal = () => {
    dispatch(addDisLike(1));
  };


  return (
    <Container className={classes.root} key={_id}>
      <Grid item xs={12} sm={3} className={classes.rightSpacing}>
        <GoalTitle>{goal_name ? goal_name : 'No name'}</GoalTitle>
        <GoalTagsContainer>
          <GoalTags>{category ? category : 'No category'}</GoalTags>
        </GoalTagsContainer>
      </Grid>

      <Grid item xs={12} sm={6}>
        <ProgressBar variant="determinate" value={Progress ? Progress : 0} />
        <ProgressDetailsContainer>
          <ProgressRate>Progress Rate: {Progress ? Progress : 0}%</ProgressRate>
          <ProgressDate>
            {goal_start && goal_end
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
        <img onClick={() => setDropDown(!showDropDown)} src={ellipsis} alt="more-options-icon" />
      </MoreOptions>
      <GoalDropDown show={{ showDropDown, setDropDown }} goal_id={_id} />
    </Container>
  )
}

export default GoalItem;
// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Container, Grid } from '@material-ui/core';
// import dislikes from '../../Images/png/dislikes.png';
// import ellipsis from '../../Images/png/ellipsis.png';
// import likes from '../../Images/png/likes.png';
// import views from '../../Images/png/views.png';
// import GoalDropDown from './GoalDropDown';
// import {
//   useStyles,
//   GoalTitle,
//   GoalTagsContainer,
//   GoalTags,
//   ProgressBar,
//   ProgressRate,
//   ProgressDate,
//   IconItemContainer,
//   IconItemCount,
//   MoreOptions,
//   ProgressDetailsContainer,
// } from './GoalItem.style';








// const GoalItem = ({ _id, milestone1, milestone2, milestone3, goal_start, goal_end, category }) => {
//   const classes = useStyles();
//   const month = {
//     month_names: [
//       'January',
//       'February',
//       'March',
//       'April',
//       'May',
//       'June',
//       'July',
//       'August',
//       'September',
//       'October',
//       'November',
//       'December',
//     ],
//     month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//   };

//   const [showDropDown, setDropDown] = useState(false);
//   const goalLikes = useSelector((state) => state.likeGoals.likes);
//   const goalDislikes = useSelector((state) => state.likeGoals.dislikes);

//   const Progress = ((milestone1 + milestone2 + milestone3) / 30) * 100;
//   const goalStart = new Date(goal_start);
//   const goalEnd = new Date(goal_end);
//   const startMonth = month.month_names_short[goalStart.getMonth()];
//   const startDate = goalStart.getDate();
//   const endMonth = month.month_names_short[goalEnd.getMonth()];
//   const endDate = goalEnd.getDate();




//   const likeGoal = () => {
//     dispatch(addLike(1));
//   };
//   const disLikeGoal = () => {
//     dispatch(addDisLike(1));
//   };


//   return (
//     <Container className={classes.root} key={_id}>
//       <Grid item xs={12} sm={3} className={classes.rightSpacing}>
//         <GoalTitle>{goal_name ? goal_name : 'No name'}</GoalTitle>
//         <GoalTagsContainer>
//           <GoalTags>{category ? category : 'No category'}</GoalTags>
//         </GoalTagsContainer>
//       </Grid>

//       <Grid item xs={12} sm={6}>
//         <ProgressBar variant="determinate" value={Progress ? Progress : 0} />
//         <ProgressDetailsContainer>
//           <ProgressRate>Progress Rate: {Progress ? Progress : 0}%</ProgressRate>
//           <ProgressDate>
//             {goal_start && goal_end
//               ? `${startMonth} ${startDate} - ${endMonth} ${endDate}`
//               : 'No date set'}
//             {/* {startMonth} {startDate} - {endMonth} {endDate} */}
//           </ProgressDate>
//         </ProgressDetailsContainer>
//       </Grid>

//       <Grid item xs={12} sm={3} className={classes.icons}>
//         <IconItemContainer>
//           <img src={views} alt="views-icon" className={classes.iconImages} />
//           <IconItemCount>66</IconItemCount>
//         </IconItemContainer>
//         <IconItemContainer>
//           <img src={likes} alt="likes-icon" className={classes.iconImages} onClick={likeGoal} />
//           <IconItemCount>{goalLikes}</IconItemCount>

//           <Likes>
//             <img src={likes} alt="likes-icon" className={classes.iconImages} />
//             <IconItemCount>8</IconItemCount>
//           </Likes>
//         </IconItemContainer>
//         <IconItemContainer>
//           <img src={dislikes} alt="dislikes-icon" className={classes.iconImages} onClick={disLikeGoal} />
//           <IconItemCount>{goalDislikes}</IconItemCount>
//         </IconItemContainer>
//       </Grid>

//       <MoreOptions>
//         <img onClick={() => setDropDown(!showDropDown)} src={ellipsis} alt="more-options-icon" />
//       </MoreOptions>
//       <GoalDropDown show={{ showDropDown, setDropDown }} goal_id={_id} />
//     </Container>
//   )
// }

// export default GoalItem;
