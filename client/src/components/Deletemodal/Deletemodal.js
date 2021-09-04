import { useDispatch, useSelector } from 'react-redux';
import { closeDeleteGoalModal } from '../../redux/deleteGoal.slice';
import { FadedBg, DeleteContent, DeleteHead, DeleteInfo, DeleteModal, DelButton, XBtn, Images } from './Delete.styled';
import deleteDataImg from './deleteAssets';

const Deletemodal = () => {
  const dispatch = useDispatch();
  const showDeleteGoalModal = useSelector(({ deleteGoal }) => deleteGoal.showDeleteGoalModal);
  return (
    <>
      <FadedBg className="faded" show={showDeleteGoalModal}>
        <DeleteModal>
          <XBtn onClick={() => dispatch(closeDeleteGoalModal())}>X</XBtn>
          <Images>
            <img src={deleteDataImg.trash} alt="trash" />
          </Images>
          <DeleteContent>
            <DeleteHead className="delete-head">Delete Goal ? </DeleteHead>
            <DeleteInfo>
              Clicking the proceed button means that people will no longer have access to view this goal.
            </DeleteInfo>
            <DelButton type="submit">Proceed</DelButton>
          </DeleteContent>
        </DeleteModal>
      </FadedBg>
    </>
  );
};

export default Deletemodal;
