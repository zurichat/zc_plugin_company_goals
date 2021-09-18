import { useDispatch, useSelector } from 'react-redux';

import { deleteErrorAction } from '../../redux/deleteGoal.slice';
import { FadedBg, DeleteContent, DeleteHead, DeleteInfo, DeleteModal, DelButton, XBtn, Images } from '../Deletemodal/Delete.styled';
import deleteErrorImg from './deleteError';

const DeleteError = () => {
  const dispatch = useDispatch();
  const { showDeleteErrorModal } = useSelector(({ deleteGoal }) => deleteGoal);
  return (
    <FadedBg className="faded" show={showDeleteErrorModal}>
      <DeleteModal>
        <XBtn onClick={() => dispatch(deleteErrorAction())}>X</XBtn>
        <Images>
          <img src={deleteErrorImg.Error} alt="trash" />
        </Images>
        <DeleteContent>
          <DeleteHead className="delete-head">Error </DeleteHead>
          <DeleteInfo>
            Action could’t be completed. Click ‘Ok’ to go back
          </DeleteInfo>
          <DelButton type="submit">Ok</DelButton>
        </DeleteContent>
      </DeleteModal>
    </FadedBg>
  );
};

export default DeleteError;
