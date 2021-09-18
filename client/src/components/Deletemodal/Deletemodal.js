import { useDispatch, useSelector } from 'react-redux';

import { deleteConfirmationAction, deleteSuccessAction } from '../../redux/deleteGoal.slice';
import { FadedBg, DeleteContent, DeleteHead, DeleteInfo, DeleteModal, DelButton, XBtn, Images } from './Delete.styled';
import deleteDataImg from './deleteAssets';

const Deletemodal = () => {
  const dispatch = useDispatch();
  const showDeleteConfirmationModal = useSelector(({ deleteGoal }) => deleteGoal.showDeleteConfirmationModal);

  const showSuccess = () => {
    dispatch(deleteConfirmationAction());
    dispatch(deleteSuccessAction());
  };
  return (
    <FadedBg className="faded" show={showDeleteConfirmationModal}>
      <DeleteModal>
        <XBtn onClick={() => dispatch(deleteConfirmationAction())}>X</XBtn>
        <Images>
          <img src={deleteDataImg.trash} alt="trash" />
        </Images>
        <DeleteContent>
          <DeleteHead className="delete-head">Delete Goal ? </DeleteHead>
          <DeleteInfo>
            Clicking the proceed button means that people will no longer have access to view this goal.
          </DeleteInfo>
          <DelButton type="submit" onClick={showSuccess}>
            Proceed
          </DelButton>
        </DeleteContent>
      </DeleteModal>
    </FadedBg>
  );
};

export default Deletemodal;
