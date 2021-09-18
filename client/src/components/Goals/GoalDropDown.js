import { useDispatch } from 'react-redux';
import { deleteConfirmationAction } from '../../redux/deleteGoal.slice';
import { GoalDropDown } from './GoalItem.style';

export default function GoalDrop({ show: {showDropDown,setDropDown}, goal_id }) {

  const dispatch = useDispatch();
  return (
    <GoalDropDown show={showDropDown}>
      <li>
        <button type="submit">View</button>
      </li>
      <li>
        <button type="submit">Edit</button>
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
            dispatch(deleteConfirmationAction(goal_id));
          }}
        >
          Delete
        </button>
      </li>
    </GoalDropDown>
  );
}
