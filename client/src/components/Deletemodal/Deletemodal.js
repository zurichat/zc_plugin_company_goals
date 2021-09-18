import { useDispatch, useSelector } from 'react-redux';
import { deleteConfirmationAction, deleteSuccessAction, deleteErrorAction } from '../../redux/deleteGoal.slice';
import { FadedBg, DeleteContent, DeleteHead, DeleteInfo, DeleteModal, DelButton, XBtn, Images } from './Delete.styled';
import deleteDataImg from './deleteAssets';

const Deletemodal = () => {
  const dispatch = useDispatch();
  const { showDeleteConfirmationModal, goalID } = useSelector(({ deleteGoal }) => deleteGoal);

  const showSuccess = (e) => {
    e.preventDefault();
    fetch(`https://goals.zuri.chat/api/v1/goals/delete?org_id=200&goal_id${goalID}`, { method: 'delete' })
      .then((res) => {
        if (!res.ok) {
          throw Error('Error deleting');
        }
        return res.json;
      })
      .then(() => {
        dispatch(deleteConfirmationAction());
        dispatch(deleteSuccessAction());
      })
      .catch(() => {
        dispatch(deleteConfirmationAction());
        dispatch(deleteErrorAction());
      });
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
          <DelButton type="submit" onClick={(e)=>showSuccess(e)}>
            Proceed
          </DelButton>
        </DeleteContent>
      </DeleteModal>
    </FadedBg>
  );
};

export default Deletemodal;
