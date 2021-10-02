/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import GoalFolder from './GoalFolder';
import ReportFormat from './ReportFormat';
import ExportButton from './ExportButton';
import { CrossTimes } from './CrossTimes';
import { ErrorMessage } from './Styles';

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
    // width: '90%',
    // height: '500px',
    maxHeight: '100vh',
    borderRadius: '4px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 5, 4),
    [theme.breakpoints.down('sm')]: {
      // width: 'fit-content',
      width: '100vw',
      padding: 0,
      // height: '100vh',
    },
    overflowX: 'hidden',
    overflowY: 'auto',
    outline: 'none',
  },
  exportHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: '0rem 1rem',
    },
  },
  exportH2: {
    textAlign: 'center',
    width: '100%',
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: '1.5em',
    lineHeight: '28.8px',
    marginBottom: '14px',
  },
  exportBody: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      padding: '2rem',
    },
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [messageState, setMessageState] = useState('');

  const onSetErrorMessage = (message) => {
    setMessageState(message);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // clear error message and localstorage
    setMessageState('');
    localStorage.clear('goalFolder');
    localStorage.clear('reportFolder');
  };

  const handleCloseX = () => {
    setOpen(false);
    // clear error message and localstorage
    setMessageState('');
    localStorage.clear('goalFolder');
    localStorage.clear('reportFolder');
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <div className={classes.exportHeader}>
          <h2 className={classes.exportH2} id="simple-modal-title">
            Export Report
          </h2>
          <CrossTimes style={{ cursor: 'pointer' }} onClick={handleCloseX}>
            {/* <CloseIcon style={{ width: '50px', height: '50px' }} />
             */}
          </CrossTimes>
        </div>

        {!messageState && (
          <div className={classes.exportBody}>
            <GoalFolder />
            <ReportFormat />
            <ExportButton onSetErrorMessage={onSetErrorMessage} />
          </div>
        )}
        {messageState && <ErrorMessage>{messageState}</ErrorMessage>}
      </div>
    </div>
  );

  return (
    <div>
      <div
        onClick={handleOpen}
        style={{
          cursor: 'pointer',
          fontFamily: 'Lato',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '0.9rem',
          lineHeight: '28px',
          color: '#1264A3',
          textUnderlinePosition: 'under',
        }}
      >
        Export Report
      </div>
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
