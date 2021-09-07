import Dialog from '@material-ui/core/Dialog';

import { makeStyles } from '@material-ui/core/styles';

import { useDispatch, useSelector } from 'react-redux';

import { toggleEditGoalModalAction } from '../../redux/toggleEditGoalModal.slice';

import { GlobalStyles } from './EdiGoalForm.styled';

import EditGoalForm from './EditGoalForm';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '100%',
    boxShadow: theme.shadows[5],
  },
}));

export default function BasicDialog() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const showEditGoalModal = useSelector(({ toggleEditGoalModal }) => toggleEditGoalModal.showEditGoalModal);

  const handleClose = () => {
    dispatch(toggleEditGoalModalAction());
  };

  return (
    <Dialog
      open={showEditGoalModal}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <GlobalStyles />
      <EditGoalForm className={classes.paper} handleClose={handleClose} />
    </Dialog>
  );
}
