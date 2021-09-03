import React, { Fragment } from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

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
  const [open, setOpen] = React.useState(false);

  // open modal
  const handleOpen = () => {
    setOpen(true);
  };

  // close modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button type="button" onClick={handleOpen} style={{ display: 'none' }}>
        Edit Mission
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <form className={classes.paper}>
            <Header id="transition-modal-title">Edit Mission</Header>
            <TextBox placeholder="Click to edit..." />
            <SaveBtn>Save</SaveBtn>
          </form>
        </Fade>
      </Modal>
    </>
  );
}

const Header = styled.h2`
  text-align: center;
  font-size: 24px;
  line-height: 28px;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

const TextBox = styled.textarea`
  border: 1px solid red;
  display: block;
  height: 208px;
  margin: 35px auto;
  font-family: Lato;
  font-size: 16px;
  border: none;
  outline: none;
  backgroundcolor: white;
  padding: 10px;
  resize: none;
  ${'' /* width: 650px; */}
  width: 100%;
  box-sizing: border-box;
`;

const SaveBtn = styled.button`
  border: none;
  background-color: rgba(0, 184, 124, 1);
  color: white;
  width: 120px;
  height: 30px;
  border-radius: 6px;
  cursor: pointer;
  float: right;
`;
