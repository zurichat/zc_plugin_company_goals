import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { showEditMissionModal, updateOrgMission } from '../../redux/organizationMission.slice';
import { Header, TextBox, SaveBtn, Paper, ModalBody } from '../Modal/styledEditMission';

const EditMission = () => {
  const dispatch = useDispatch();
  const { missionText, showMissionModal } = useSelector((state) => state.organizationMission);
  const [editText, setEditText] = useState('');

  const dispatchAction = () => {
    if (editText) {
      dispatch(updateOrgMission(editText));
    }
  };

  useEffect(() => {
    setEditText(missionText);
  }, [missionText]);

  return (
    <ModalBody>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // className={classes.modal}
        open={showMissionModal}
        onClose={() => dispatch(showEditMissionModal())}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Fade in={showMissionModal}>
          <Paper>
            <form onSubmit={(e) => e.preventDefault()}>
              <Header id="transition-modal-title">Edit Mission</Header>
              <TextBox
                required
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="Click to edit..."
              />
              <SaveBtn onClick={dispatchAction}>Save</SaveBtn>
            </form>
          </Paper>
        </Fade>
      </Modal>
    </ModalBody>
  );
};

export default EditMission;
