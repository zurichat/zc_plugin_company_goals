import React, { useState } from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector, useDispatch } from 'react-redux';

import { saveVision, showEditVisionModal } from '../../../../redux/organizationVision.slice';

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
  const [editText, setEditText] = useState('');

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
            <ActionCancelEditVisionButton onClick={() => dispatch(showEditVisionModal())}>
              Cancel
            </ActionCancelEditVisionButton>
            <ActionButton onClick={() => editText && dispatch(saveVision(editText))}>Save</ActionButton>
          </ActionButtonsContainer>
        </EditVisionContainer>
      </Fade>
    </EditVisionModal>
  );
};

export default OrganizationVisionEditModal;
