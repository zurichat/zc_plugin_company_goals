import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useDispatch } from 'react-redux';
// useSelector
import { toggleCreateGoalModalAction } from '../../redux/toggleCreateGoalModal.slice';
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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  // const showCreateGoalModal = useSelector(({ toggleCreateGoalModal }) => toggleCreateGoalModal.showCreateGoalModal);

  const handleClose = () => {
    dispatch(toggleCreateGoalModalAction());
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Open simple dialog
      </Button>
      <Dialog
        // open={showCreateGoalModal}
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullScreen={fullScreen}
        fullWidth
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <GlobalStyles />
        <GoalForm className={classes.paper} handleClose={handleClose} />
      </Dialog>
    </>
  );
}
