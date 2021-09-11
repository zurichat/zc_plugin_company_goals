import Dialog from '@material-ui/core/Dialog';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useDispatch, useSelector } from 'react-redux';

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
  const showCreateGoalModal = useSelector(({ toggleCreateGoalModal }) => toggleCreateGoalModal.showCreateGoalModal);

  const handleClose = () => {
    dispatch(toggleCreateGoalModalAction());
  };

  return (
    <Dialog
      open={showCreateGoalModal}
      onClose={handleClose}
      maxWidth="md"
      fullScreen={fullScreen}
      fullWidth
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <GlobalStyles />
      <GoalForm className={classes.paper} handleClose={handleClose} />
    </Dialog>
  );
}
