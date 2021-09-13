import { useDispatch, useSelector } from 'react-redux';

import { closeDeleteGoalModal } from '../../redux/deleteGoal.slice';
import { FadedBg, DeleteContent, DeleteHead, DeleteInfo, DeleteModal, DelButton, XBtn, Images } from '../Deletemodal/Delete.styled';
import deleteSuccessImg from './deleteSuccess';

const DeleteSuccess = () => {
  const dispatch = useDispatch();
  const showDeleteGoalModal = useSelector(({ deleteGoal }) => deleteGoal.showDeleteGoalModal);
  return (
    <FadedBg className="faded" show={false}>
      <DeleteModal>
        <XBtn onClick={() => dispatch(closeDeleteGoalModal())}>X</XBtn>
        <Images>
          <img src={deleteSuccessImg.thumbs} alt="trash" />
        </Images>
        <DeleteContent>
          <DeleteHead className="delete-head">Goal Deleted Successfully </DeleteHead>
          <DeleteInfo>
            Clicking the return button to go back to the main dashboard.
          </DeleteInfo>
          <DelButton type="submit">Ok</DelButton>
        </DeleteContent>
      </DeleteModal>
    </FadedBg>
  );
};

export default DeleteSuccess;
