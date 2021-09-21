import React, { useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVision } from '../../../../redux/getVisionSlice';
import { showEditVisionModal, updateOrgVision } from '../../../../redux/organizationVision.slice';
import {
  EditVisionModal,
  EditVisionContainer,
  Header,
  TextBox,
  ActionButtonsContainer,
  ActionButton,
  ActionCancelEditVisionButton,
} from './EditOrgVision.styled';

const OrganizationVisionEditModal = () => {
  const dispatch = useDispatch();
  const showVisionModal = useSelector(({ organizationVision }) => organizationVision.showVisionModal);
  const vision = useSelector(({ organizationVision }) => organizationVision.vision);
  const loading = useSelector(({ organizationVision }) => organizationVision.loading);
  const [editText, setEditText] = useState('');

  const dispatchAction = () => {
    if (editText) {
      dispatch(updateOrgVision(editText));
      dispatch(fetchVision()); // Not sure if this works // criss-cross
    }
  };

  return (
    <EditVisionModal
      aria-labelledby="organization-vision-modal"
      aria-describedby="edit-organization-vision-modal"
      open={showVisionModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={showVisionModal}>
        <EditVisionContainer>
          <Header id="transition-modal-title">Edit Vision</Header>
          <TextBox placeholder="Click to edit..." value={editText} onChange={(e) => setEditText(e.target.value)} />
          <ActionButtonsContainer>
            {/* <ActionCancelEditVisionButton disabled={loading} onClick={() => dispatch(showEditVisionModal())}>
              Cancel
            </ActionCancelEditVisionButton> */}
            <ActionButton
              disabled={loading}
              onClick={() => {
                dispatchAction();
              }}
            >
              {loading ? 'please wait' : 'save'}
            </ActionButton>
          </ActionButtonsContainer>
        </EditVisionContainer>
      </Fade>
    </EditVisionModal>
  );
};

export default OrganizationVisionEditModal;
