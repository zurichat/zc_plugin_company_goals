import { useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import ellipsis from '../../Images/png/ellipsis.png';
import { editGoalData } from '../../redux/organizationGoal.slice';
import { MoreOptions } from './GoalItem.style';
import { deleteConfirmationAction } from '../../redux/deleteGoal.slice';
import { GoalMenu } from './GoalItem.style';
import { toggleCreateGoalModalAction } from '../../redux/toggleCreateGoalModal.slice';
import { GetUserInfo } from '@zuri/control';

export default function GoalDrop({ goalData }) {
  const ref = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isMenuOpen]);

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

  useEffect(() => {
    (async () => {
      try {
        const userInfo = await GetUserInfo();
        if (userInfo) {
          const userRole = userInfo[0].role;
          userRole === 'owner' && setIsOwner(true);
        }
      } catch (err) {
        console.log('something went wrong with getting user info from goals dropdown display', err);
      }
    })();
  }, []);

  return (
    <MoreOptions ref={ref}>
      <img
        src={ellipsis}
        alt="more-options-icon"
        onClick={(evt) => {
          evt.stopPropagation();
          setIsMenuOpen((oldState) => !oldState);
        }}
      />
      {isMenuOpen && (
        <GoalMenu>
          <li>
            <button type="submit">View</button>
          </li>
          {isOwner && (
            <>
              <li>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsMenuOpen((oldState) => !oldState);
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
                    e.stopPropagation();
                    setIsMenuOpen((oldState) => !oldState);
                    dispatch(deleteConfirmationAction(goalData._id));
                  }}
                >
                  Delete
                </button>
              </li>
            </>
          )}
        </GoalMenu>
      )}
    </MoreOptions>
  );
}
