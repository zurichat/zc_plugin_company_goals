import { useDispatch } from 'react-redux';
import { editGoalData } from '../../redux/organizationGoal.slice';
import { deleteConfirmationAction } from '../../redux/deleteGoal.slice';
import { GoalDropDown } from './GoalItem.style';
import { toggleCreateGoalModalAction } from '../../redux/toggleCreateGoalModal.slice';

export default function GoalDrop({ show: { showDropDown, setDropDown }, goalData }) {
  const setEditGoalData = {
    isEditing: {
      status: Boolean(goalData._id),
      goalId: goalData._id,
    },
    editGoalData: {
      goal_name: goalData.goal_name || '',
      description: goalData.description || '',
      goal_type: goalData.goal_type || '',
      category: goalData.category || '',
      start_date: goalData.start_date || '',
      due_date: goalData.due_date || '',
    },
  };
  const dispatch = useDispatch();

  return (
    <GoalDropDown show={showDropDown}>
      <li>
        <button type="submit">View</button>
      </li>
      <li>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setDropDown(!showDropDown);
            dispatch(editGoalData(setEditGoalData));
            dispatch(toggleCreateGoalModalAction());
          }}
        >
          Edit
        </button>
      </li>
      <li>
        <button type="submit">Update</button>
      </li>
      <li>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setDropDown(!showDropDown);
            dispatch(deleteConfirmationAction(goalData._id));
          }}
        >
          Delete
        </button>
      </li>
    </GoalDropDown>
  );
}
