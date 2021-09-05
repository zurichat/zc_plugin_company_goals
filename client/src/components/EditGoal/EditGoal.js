import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';

import { makeStyles } from '@material-ui/core/styles';

import { useDispatch } from 'react-redux';

import { getGoal } from '../../features/goalSlice';

import { GlobalStyles } from './EdiGoalForm.styled';

import EditGoalForm from './EditGoalForm';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '100%',
    boxShadow: theme.shadows[5],
  },
}));

const dummyData = {
  name: 'Test',
  owner: 'Mark Essien',
  status: false,
  endDate: '02/12/2019',
  category: 'Web development',
  description: 'This is a dummy data',
};

export default function BasicDialog() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = (data) => {
    dispatch(getGoal(data));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="button"
        onClick={() => handleOpen(dummyData)}
        style={{ backgroundColor: '#00B87C', color: '#fff', marginTop: '1rem', fontWeight: 600 }}
      >
        Edit Modal
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <GlobalStyles />
        <EditGoalForm className={classes.paper} handleClose={handleClose} />
      </Dialog>
    </div>
  );
}
