import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGoals } from '../../redux/showGoalSlice';
import GoalItem from './GoalItem';
import EmptyGoal from '../empty-goal-interface/EmptyGoal';

const Goals = () => {
  
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
