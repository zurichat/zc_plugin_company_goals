import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';

import GoalItem from '../Goals/GoalItem';

import GoalDetailData from './GoalDetailData';
import EmptyGoal from '../empty-goal-interface/EmptyGoal';
import Loader from '../loader/loader';
import Error from '../error/Error';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

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

const AnnualGoals = () => {
  let { orgId } = useParams();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { roomId } = useSelector((state) => state.organizationRoom);

  console.log('roomy', roomId);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const fetcher = async (getAllGoalsUrl) => {
    const response = await axios.get(getAllGoalsUrl);
    return response.data;
  };
  const requestURL = `${
    process.env.NODE_ENV === 'production' ? 'https://goals.zuri.chat' : 'http://localhost:4000'
  }/api/v1/goals/?org_id=${orgId || '6145d099285e4a184020742e'}`;
  const { data, error } = useSWR('getAllGoals', () => fetcher(requestURL));
  console.log('err', error);
  if (!error && !data) return <Loader />;

  if (error) return <Error errorMessage={error.message} />;

  if (!data.data.length) return <EmptyGoal />;

  const annualGoals = data.data.filter(annual => annual.goal_type === 'annual')

  return (
    <div className={classes.root}>
      {annualGoals.map((goal) => {
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
      })}
    </div>
  );
}

export default AnnualGoals