<<<<<<< HEAD
import React from 'react';
import { useEffect, useStates } from 'react';
=======
import React,{Fragment} from 'react';
>>>>>>> 5f5d31806dc460fe0de6847cfc144e931e937bde
import axios from 'axios';
import useSWR from 'swr';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Pagination from './Pagination';

import GoalItem from '../Goals/GoalItem';

import GoalDetailData from './GoalDetailData';
import EmptyGoal from '../empty-goal-interface/EmptyGoal';
import Loader from '../loader/loader';
import Error from '../error/Error';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getGoals } from '../../redux/showGoalSlice';
import TargetForm from '../TargetForm/TargetForm';
import { Div, Text, Button } from '../GoalDetailAccordion/GoalDetail.styled';
import { openModal } from '../../redux/TargetModalSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 0,
    zIndex: 0,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function GoalDetailAccordion() {
  let { orgId } = useParams();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { roomId } = useSelector((state) => state.organizationRoom);
  const [goalComponents, setGoalComponents] = React.useState();
  const [pageNum, setPageNum] = React.useState(1);
  const dispatch = useDispatch();
  const { goals, status, errorInfo } = useSelector((state) => state.showGoals);  

  console.log('roomy', roomId);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // const fetcher = async (pageNum) => {
  //   let Url = `https://goals.zuri.chat/api/v1/goals?org_id=6145d099285e4a184020742e&page=${pageNum}&limit=3`;

  //   const response = await axios.get(Url);
  //   return response.data;
  // };

  // useEffect(async () => {
  //   const response = await fetcher(pageNum);

  //   setGoalComponents(response);
  // }, [pageNum]);

  // return (
  //   <div className={classes.root}>
  //     {console.log(goalComponents)}
  //     {goalComponents && <Pagination pageCount={goalComponents} setPageNum={setPageNum} pageNum={pageNum} />}
  // const fetcher = async (getAllGoalsUrl) => {
  //   const response = await axios.get(getAllGoalsUrl);
  //   return response.data;
  // };
  const requestURL = `${
    process.env.NODE_ENV === 'production' ? 'https://goals.zuri.chat' : 'http://localhost:4000'
  }/api/v1/goals/?org_id=${orgId || '6145d099285e4a184020742e'}`;
  const info = useSWR('getAllGoals', () => dispatch(getGoals(requestURL)));
  // console.log('err', error);
  if (!errorInfo && !goals) return <Loader />;

  if (errorInfo) return <Error errorMessage={errorInfo.message} />;

  if (!goals.length) return <EmptyGoal />;

  return (
    <div className={classes.root}>
        {goals.map((goal) => {
          return (
            <Accordion expanded={expanded == goal.room_id} onChange={handleChange(goal.room_id)} key={goal.room_id}>
              <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
                <GoalItem goalData={goal} />
              </AccordionSummary>
              <AccordionDetails style={{ height: '50%' }}>
                <GoalDetailData goalData={goal} />
              </AccordionDetails>
              <AccordionDetails>
                <Div>
                  <Text primary> Goal Progress </Text>
                  <Button onClick={() => dispatch(openModal())}> + Add Target! </Button>
                </Div>
              </AccordionDetails>
            </Accordion>
          );
        })}
        <TargetForm/>
    </div>
  );
}

// {
//   goalComponents &&
//     goalComponents.data.map((goal) => {
//       return (
//         <Accordion expanded={expanded == goal.room_id} onChange={handleChange(goal.room_id)} key={goal.room_id}>
//           <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
//             <GoalItem goalData={goal} />
//           </AccordionSummary>
//           <AccordionDetails style={{ height: '50%' }}>
//             <GoalDetailData goalData={goal} />
//           </AccordionDetails>
//         </Accordion>
//       );
//     });
// }
