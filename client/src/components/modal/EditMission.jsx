import React, { Fragment } from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import { showEditMissionModal } from '../../redux/showEditMissionModal';

import { Header, TextBox, SaveBtn } from '../Modal/styledEditMission';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Lato',
  },
  paper: {
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: '#F6F6F6',
    border: '0px solid #000',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    padding: '35px',
    fontFamily: 'Lato',
    width: '720px',
    height: '406px',
    maxWidth: '100%',
    margin: '1rem',
    boxSizing: 'border-box',
  },
}));

export default function EditMission() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { showMission } = useSelector((state) => state.showMission);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={showMission}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showMission}>
          <form className={classes.paper}>
            <Header id="transition-modal-title">Edit Mission</Header>
            <TextBox placeholder="Click to edit..." />
            <SaveBtn>Save</SaveBtn>
            <SaveBtn onClick={() => dispatch(showEditMissionModal())}>Cancel</SaveBtn>
          </form>
        </Fade>
      </Modal>
    </>
  );
}
