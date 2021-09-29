import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCreateGoalModalAction } from '../../redux/toggleCreateGoalModal.slice';
import GoalForm from './GoalForm';
import { resetGoalFormData } from '../../redux/organizationGoal.slice';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '100%',
    boxShadow: theme.shadows[5],
  },
}));

export default function SimpleDialog() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const showCreateGoalModal = useSelector(({ toggleCreateGoalModal }) => toggleCreateGoalModal.showCreateGoalModal);

  const handleClose = () => {
    dispatch(resetGoalFormData());
    dispatch(toggleCreateGoalModalAction());
  };

  return (
    <Dialog
      open={showCreateGoalModal}
      onClose={handleClose}
      maxWidth="xs"
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <GoalForm className={classes.paper} handleClose={handleClose} />
    </Dialog>
  );
}
