import React, { useState } from 'react';

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
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
