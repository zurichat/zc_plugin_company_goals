/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import GoalFolder from './GoalFolder/GoalFolder';
import ReportFormat from './ReportFormat/ReportFormat';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '759px',
    height: '500px',
    borderRadius: '4px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  exportHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  exportH2: {
    textAlign: 'center',
    width: '100%',
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: '24px',
    lineHeight: '28.8px',
    marginBottom: '14px',
  },
  exportBody: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseX = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        <div className={classes.exportHeader}>
          <h2 className={classes.exportH2} id="simple-modal-title">
            Export Report
          </h2>
          <span style={{ cursor: 'pointer' }} onClick={handleCloseX}>
            X
          </span>
        </div>

        <div className={classes.exportBody}>
          <GoalFolder />
          <ReportFormat />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
