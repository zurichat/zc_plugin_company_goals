/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { Container, Grid } from '@material-ui/core';
import dislikes from '../../Images/png/dislikes.png';
import likes from '../../Images/png/likes.png';
import views from '../../Images/png/views.png';
import { useEffect, useState } from 'react';
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
import { useParams } from 'react-router';
import { GetUserInfo } from '@zuri/control';

const GoalItem = ({ goalData }) => {
  let { orgId } = useParams();
  const userId = JSON.parse(sessionStorage.getItem('user'));
  

  //Setting Likes and retriving
  const [like, setLike] = useState('');
  const [toggleLike, setToggleLike] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  useEffect(() => {
    axios
      .get(
        `https://goals.zuri.chat/api/v1/goals/goallikes?org_id=${orgId || '6145d099285e4a184020742e'}&goal_id=${
          goalData._id
        }`
      )
      .then((response) => setTotalLikes(response.data.data.count))
      .catch((error) => console.log(error));
    axios
      .get(
        `https://goals.zuri.chat/api/v1/goals/single-goal-progress?org_id=${orgId || '6145d099285e4a184020742e'}&goal_id=${
          goalData._id
        }`
      )
  });

  const handleSetLike = (e) => {
    e.stopPropagation();

    axios
      .get(
        `https://goals.zuri.chat/api/v1/goals/like?org_id=${orgId ? orgId : '6145d099285e4a184020742e'}&goal_id=${
          goalData._id
        }&user_id=${userId ? userId.id : 5}`
      )
      .then((response) => setLike(response.data.message))
      .catch((error) => console.log(error));
 
    setToggleLike(!toggleLike)
if(toggleLike === true && toggleDislike === true){
    setToggleDislike(false)
}
  };

  //Setting Dislikes and retriving Dislikes
  const [dislike, setDislike] = useState('');
  const [totalDislikes, setTotalDislikes] = useState(0);
  const [toggleDislike, setToggleDislike] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://goals.zuri.chat/api/v1/goals/goaldislikes?org_id=${orgId ? orgId : '6145d099285e4a184020742e'}&goal_id=${
          goalData._id
        }`
      )
      .then((response) => setTotalDislikes(response.data.data.count))
      .catch((error) => console.log(error));
  });

  const handleSetDislike = (e) => {
    e.stopPropagation();

    axios
      .get(
        `https://goals.zuri.chat/api/v1/goals/dislike?org_id=${orgId ? orgId : '6145d099285e4a184020742e'}&goal_id=${
          goalData._id
        }&user_id=${userId ? userId.id : 5}`
      )
      .then((response) => setDislike(response.data.message))
      .catch((error) => console.log(error));
    
    setToggleDislike(!toggleDislike)
if(toggleLike === true && toggleDislike === true){
    setToggleLike(false)
}
  };


  useEffect(() => {
    axios
      .get(
        `https://goals.zuri.chat/api/v1/goals/userdislike?org_id=${orgId ? orgId : '6145d099285e4a184020742e'}&goal_id=${
          goalData._id
        }&user_id=${userId ? userId.id : 5}`
      )
      .then((response) => setToggleDislike(response.data.data))
      .catch((error) => console.log(error));
    
   

      axios
      .get(
        `https://goals.zuri.chat/api/v1/goals/userlike?org_id=${orgId ? orgId : '6145d099285e4a184020742e'}&goal_id=${
          goalData._id
        }&user_id=${userId ? userId.id : 5}`
      )
      .then((response) => setToggleLike(response.data.data))
      .catch((error) => console.log(error));
  } , [like , dislike]);

  //Getting goal reaction
  useEffect(() => {
    axios
    .get(`https://goals.zuri.chat/api/v1/goals/goalReaction?org_id=${orgId ? orgId : '6145d099285e4a184020742e'}&goal_id=${goalData._id}`)
    .then(response => console.log(response.data.data))
    .catch(error => console.log(error))
  },[])

  // const loop = (e) => {
  //   fetch('https://goals.zuri.chat/api/v1/goals/?org_id=6145d099285e4a184020742e&user_id=6145cf0c285e4a1840207426&goal_id=${e}')
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(err => console.error(err));
  // }

  // loop(goalData.id)
  // console.log("This is what i look up to",goalData._id)

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

  // const Progress = ((goalData.milestone1 + goalData.milestone2 + goalData.milestone3) / 30) * 100;
  const Progress = Math.floor(goalData.Progress ? goalData.Progress : 0);
  const goalStart = new Date(goalData.start_date);
  const goalEnd = new Date(goalData.due_date);
  const startMonth = month.month_names_short[goalStart.getMonth()];
  const startDate = goalStart.getDate();
  const endMonth = month.month_names_short[goalEnd.getMonth()];
  const endDate = goalEnd.getDate();

  return (
    <Container className={classes.root} key={goalData.room_id}>
      <Grid item xs={12} sm={3} className={classes.rightSpacing}>
        <GoalTitle goalIsExpired={goalData.isExpired}>{goalData.goal_name ? goalData.goal_name : 'No name'}</GoalTitle>
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
        <IconItemContainer onClick={(ev) => handleSetLike(ev)}>
          {toggleLike == false 
            ? <img src={likes} alt="likes-icon" className={classes.iconImages} style={{filter: "opacity(60%)"}}/>
            : <img src={likes} alt="likes-icon" className={classes.iconImages} style={{filter:"brightness(1)", width:"18px" , height:"18px"}} />
          }         
          <IconItemCount>{totalLikes}</IconItemCount>
        </IconItemContainer>
        <IconItemContainer onClick={(ev) => handleSetDislike(ev)}>
          {toggleDislike == false 
          ? <img src={dislikes} alt="dislikes-icon" className={classes.iconImages} style={{filter: "opacity(60%)"}}/> 
          : <img src={dislikes} alt="dislikes-icon" className={classes.iconImages} style={{filter:"brightness(1)" , width:"18px" , height:"18px"}}/>}
          
          <IconItemCount>{totalDislikes}</IconItemCount>
        </IconItemContainer>
      </Grid>

      <GoalDropDown goalData={goalData} />

      {/* <Menuoption show={showDropDown} toggleShowDropDown={() => setDropDown(!showDropDown)} /> */}
    </Container>
  );
};

export default GoalItem;
