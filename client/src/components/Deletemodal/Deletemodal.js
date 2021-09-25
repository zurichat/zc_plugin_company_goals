import { useDispatch, useSelector } from 'react-redux';
import { useSWRConfig } from 'swr';
import { deleteConfirmationAction, deleteSuccessAction, deleteErrorAction } from '../../redux/deleteGoal.slice';
import { FadedBg, DeleteContent, DeleteHead, DeleteInfo, DeleteModal, DelButton, XBtn, Images } from './Delete.styled';
import deleteDataImg from './deleteAssets';

const Deletemodal = () => {
  const dispatch = useDispatch();
  const { mutate } = useSWRConfig();
  const { showDeleteConfirmationModal, goalID } = useSelector(({ deleteGoal }) => deleteGoal);

  const outClose = (e) => {
    if (e.target.classList.contains('faded')) {
      dispatch(deleteConfirmationAction());
    }
  };

  const showSuccess = (e) => {
    e.preventDefault();
    fetch(`https://goals.zuri.chat/api/v1/goals/delete?org_id=6145d099285e4a184020742e&goal_id=${goalID}`, {
      method: 'delete',
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('Error deleting');
        }
        return res.json;
      })
      .then(() => {
        dispatch(deleteConfirmationAction());
        dispatch(deleteSuccessAction());
        mutate('getAllGoals');
      })
      .catch(() => {
        dispatch(deleteConfirmationAction());
        dispatch(deleteErrorAction());
      });
  };

  return (
    <FadedBg className="faded" onClick={(e) => outClose(e)} show={showDeleteConfirmationModal}>
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
          <DelButton type="submit" onClick={(e) => showSuccess(e)}>
            Proceed
          </DelButton>
        </DeleteContent>
      </DeleteModal>
    </FadedBg>
  );
};

export default Deletemodal;
