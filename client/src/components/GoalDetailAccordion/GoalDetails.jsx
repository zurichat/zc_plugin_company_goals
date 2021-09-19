import React from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';

import GoalItem from 'components/Goals/GoalItem';

import GoalDetailData from './GoalDetailData';

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
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <GoalItem />
        </AccordionSummary>
        <AccordionDetails style={{ height: '50%' }}>
          <GoalDetailData />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <GoalItem />
        </AccordionSummary>
        <AccordionDetails style={{ height: '50%' }}>
          <GoalDetailData />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <GoalItem />
        </AccordionSummary>
        <AccordionDetails style={{ height: '50%' }}>
          <GoalDetailData />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <GoalItem />
        </AccordionSummary>
        <AccordionDetails style={{ height: '50%' }}>
          <GoalDetailData />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
