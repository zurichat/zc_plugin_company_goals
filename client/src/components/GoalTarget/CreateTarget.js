import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import TargetForm from './TargetForm';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '100%',
    boxShadow: theme.shadows[5],
  },
}));

export default function TargetDialog() {
  const classes = useStyles();

  // const showCreateGoalModal = useSelector(({ toggleCreateGoalModal }) => toggleCreateGoalModal.showCreateGoalModal);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Open target dialog
      </Button>
      <Dialog
        // open={showCreateGoalModal}
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <TargetForm className={classes.paper} handleClose={handleClose} />
      </Dialog>
    </>
  );
}
