/* eslint-disable no-underscore-dangle */
import { Container, Grid } from '@material-ui/core';
import dislikes from '../../Images/png/dislikes.png';
import likes from '../../Images/png/likes.png';
import views from '../../Images/png/views.png';
import GoalDropDown from './GoalDropDown';
import {
  useStyles,
  GoalTitle,
  GoalTags,
  ProgressBar,
  ProgressRate,
  ProgressDate,
  IconItemContainer,
  IconItemCount,
  ProgressDetailsContainer,
} from './GoalItem.style';
import { useSelector, useDispatch } from 'react-redux';
import { addDisLike, addLike } from '../../redux/likeGoalSlice';



const GoalItem = ({ goalData }) => { 

  // const loop = (e) => {
  //   fetch('https://goals.zuri.chat/api/v1/goals/?org_id=6145d099285e4a184020742e&user_id=6145cf0c285e4a1840207426&goal_id=${e}')
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(err => console.error(err));
  // }

  // loop(goalData.id)


  const classes = useStyles();
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

 
  const goalLikes = useSelector((state) => state.likeGoals.likes);
  const goalDislikes = useSelector((state) => state.likeGoals.dislikes);
  // const errorMessage = useSelector((state) => state.goals.errorMessage);

  const likeGoal = (e) => {
    let goalID = goalData.id
    e.stopPropagation();
    let like = dispatch(addLike(1));
    (async () => {
      const rawResponse = await fetch('https://goals.zuri.chat/api/v1/goals/like?org_id=6145d099285e4a184020742e&user_id=6145cf0c285e4a1840207426&goal_id=${goalID}', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: {like}
      });
      const content = await rawResponse.json();
    
      
    })();
    
}
  
  const disLikeGoal = (e) => {
    let goalIDDislike = goalData.id
    e.stopPropagation();
    let dislike = dispatch(addDisLike(1));
    (async () => {
      const rawResponse = await fetch('https://goals.zuri.chat/api/v1/goals/dislike  ?org_id=6145d099285e4a184020742e&user_id=6145cf0c285e4a1840207426&goal_id=${goalIDDislike}', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: {dislike}
      });
      const content = await rawResponse.json();
  
    })();
  };

  

  const Progress = ((goalData.milestone1 + goalData.milestone2 + goalData.milestone3) / 30) * 100;
  const goalStart = new Date(goalData.start_date);
  const goalEnd = new Date(goalData.due_date);
  const startMonth = month.month_names_short[goalStart.getMonth()];
  const startDate = goalStart.getDate();
  const endMonth = month.month_names_short[goalEnd.getMonth()];
  const endDate = goalEnd.getDate();

  return (
    <Container className={classes.root} key={goalData.room_id}>
      <Grid item xs={12} sm={3} className={classes.rightSpacing}>
        <GoalTitle>{goalData.goal_name ? goalData.goal_name : 'No name'}</GoalTitle>
        <GoalTags>{goalData.category ? goalData.category : 'No category'}</GoalTags>
      </Grid>

      <Grid item xs={12} sm={12}>
        <ProgressBar variant="determinate" value={Progress ? Progress : 0} />
        <ProgressDetailsContainer>
          <ProgressRate>Progress Rate: {Progress ? Progress : 0}%</ProgressRate>
          <ProgressDate>
            {goalData.start_date && goalData.due_date
              ? `${startMonth} ${startDate} - ${endMonth} ${endDate}`
              : 'No date set'}
          </ProgressDate>
        </ProgressDetailsContainer>
      </Grid>

      <Grid item xs={12} sm={3} className={classes.icons}>
        <IconItemContainer onClick={(ev) => likeGoal(ev)}>
          <img src={likes} alt="likes-icon" className={classes.iconImages} />
          <IconItemCount>{goalLikes}</IconItemCount>
        </IconItemContainer>
        <IconItemContainer onClick={(ev) => disLikeGoal(ev)}>
          <img src={dislikes} alt="dislikes-icon" className={classes.iconImages} />
          <IconItemCount>{goalDislikes}</IconItemCount>
        </IconItemContainer>
      </Grid>

      
        <GoalDropDown goalData={goalData} />
      
      {/* <Menuoption show={showDropDown} toggleShowDropDown={() => setDropDown(!showDropDown)} /> */}
    </Container>
  );
};

export default GoalItem;
