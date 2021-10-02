import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useSWRConfig } from 'swr';
import { deleteConfirmationAction, deleteSuccessAction, deleteErrorAction } from '../../redux/deleteGoal.slice';
import { FadedBg, DeleteContent, DeleteHead, DeleteInfo, DeleteModal, DelButton, XBtn, Images } from './Delete.styled';
import deleteDataImg from './deleteAssets';
import {GetUserInfo} from "@zuri/control";

const Deletemodal = () => {
  const { orgId } = useParams();
  const dispatch = useDispatch();
  const { mutate } = useSWRConfig();
  const { showDeleteConfirmationModal, goalID } = useSelector(({ deleteGoal }) => deleteGoal);



  const outClose = (e) => {

    if (e.target.classList.contains('faded')) {
      dispatch(deleteConfirmationAction());
    }
  };

 
  
  const showSuccess = async (e) => {
    const getInfo = await GetUserInfo();
    const { token } = getInfo;
    e.preventDefault();
    fetch(`https://goals.zuri.chat/api/v1/goals/delete?org_id=${orgId}&goal_id=${goalID}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token} ${orgId}`,
      },
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
