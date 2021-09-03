import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';

import GoalForm from './GoalForm';
import { GlobalStyles } from './GoalForm.style';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '100%',
    boxShadow: theme.shadows[5],
  },
}));

export default function SimpleDialog() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [goalData, setGoalData] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {goalData && (
        <Button onClick={handleOpen} style={{ backgroundColor: '#00B87C', color: '#fff', fontWeight: 600 }}>
          Open Modal
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <GlobalStyles />
        <GoalForm className={classes.paper} handleClose={handleClose} />
      </Dialog>
    </div>
  );
}
