import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGoals } from '../../redux/showGoalSlice';
import GoalItem from './GoalItem';
import EmptyGoal from '../empty-goal-interface/EmptyGoal';

const Goals = () => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals.list);
  const status = useSelector((state) => state.goals.status);
  const errorMessage = useSelector((state) => state.goals.errorMessage);
  

  useEffect(() => {
    dispatch(getGoals()).catch(obj => {
      console.log("Shite!")
    });
  }, [dispatch]);

  const hasGoal = goals.data ? 1 : 0;  
  return (
    <React.Fragment>
      {status === 'success' && !hasGoal && <EmptyGoal />}
      {status === 'success' && hasGoal && <GoalItem goals={goals} />}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>
        {errorMessage} 
        {/* A button might be here to retry */}
        </p>
        }
    </React.Fragment>
  );
};

export default Goals;
