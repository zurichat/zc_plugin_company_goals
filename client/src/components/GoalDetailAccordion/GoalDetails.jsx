import React, { Fragment } from 'react';
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
import { Div, Text, Button, Container } from './GoalDetail.styled';
import { openModal } from '../../redux/TargetModalSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '480px',
    overflowY: 'scroll',
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

export default function GoalDetailAccordion(props) {
  let { orgId } = useParams();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { roomId } = useSelector((state) => state.organizationRoom);
  const [goalComponents, setGoalComponents] = React.useState();
  const [pageNum, setPageNum] = React.useState(1);
  const dispatch = useDispatch();
  const { goals, status, errorInfo } = useSelector((state) => state.showGoals);

  // console.log(goals);
  // console.log('roomy', roomId);
  let output;
  if (props.selectedGoals === 'all') {
    output = goals;
  } else {
    output = goals.filter((res) => res.goal_type === props.selectedGoals);
  }
  //
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

  // const info = useSWR('getAllGoals', () => dispatch(getGoals(requestURL)));
  // // console.log('err', error);
  // if (!errorInfo && !goals) return <Loader />;

  // if (errorInfo) return <Error errorMessage={errorInfo.message} />;

  // if (!goals.length) return <EmptyGoal />;

  // fecth page with default paratmeter

  async function getAllComponentsFromServer(pageNum) {
    const requestURL = `https://goals.zuri.chat/api/v1/goals?org_id=6145d099285e4a184020742e&page=${pageNum}&limit=3`;
    try {
      let { data } = await axios.get(requestURL);
      if (!data) {
        console.log('no data');

        return <Loader />;
      } else {
        console.log('there is data');
        setGoalComponents(data);

        console.log('there is still  data');
      }
    } catch (error) {
      console.log(error);
      return <Error errorMessage={error.message} />;
    }
  }

  React.useEffect(() => {
    getAllComponentsFromServer(pageNum);
  }, [pageNum]);

  return (
    <React.Fragment>
      <Container className={classes.root}>
        {console.log(goalComponents)}
        {!goalComponents ? (
          <Loader />
        ) : (
          goalComponents.data.map((goal) => {
            return (
              <Accordion expanded={expanded == goal.room_id} onChange={handleChange(goal.room_id)} key={goal.room_id}>
                <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
                  <GoalItem goalData={goal} />
                </AccordionSummary>
                <AccordionDetails style={{ height: '50%' }}>
                  <GoalDetailData goalData={goal} />
                </AccordionDetails>
              </Accordion>
            );
          })
        )}
      </Container>
      {goalComponents && <Pagination setPageNum={setPageNum} pageNum={pageNum} goalComponents={goalComponents} />}
    </React.Fragment>
  );

  //   <div className={classes.root}>
  //     {output.map((goal) => {
  //       return (
  //         <Accordion expanded={expanded == goal.room_id} onChange={handleChange(goal.room_id)} key={goal.room_id}>
  //           <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
  //             <GoalItem goalData={goal} />
  //           </AccordionSummary>
  //           <AccordionDetails style={{ height: '50%' }}>
  //             <GoalDetailData goalData={goal} />
  //           </AccordionDetails>
  //           <AccordionDetails>
  //             <Div>
  //               <Text primary> Goal Progress </Text>
  //               <Button onClick={() => dispatch(openModal())}> + Add Target! </Button>
  //             </Div>
  //           </AccordionDetails>
  //         </Accordion>
  //       );
  //     })}
  //     <TargetForm />
  //   </div>
  // );
}
