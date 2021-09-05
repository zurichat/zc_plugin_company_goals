import { configureStore } from '@reduxjs/toolkit';

import deleteGoalReducer from './deleteGoal.slice';
import visionReducer from './organizationVision.slice';
import editMissionReducer from './showEditMissionModal';
import createGoalModalReducer from './toggleCreateGoalModal.slice';
import editGoalModalReducer from './toggleEditGoalModal.slice';
import newGoalReducer from './NewGoalSlice';

const store = configureStore({
  reducer: {
    showMission: editMissionReducer,
    organizationVision: visionReducer,
    toggleCreateGoalModal: createGoalModalReducer,
    toggleEditGoalModal: editGoalModalReducer,
    deleteGoal: deleteGoalReducer,
    newGoal: newGoalReducer,
  },
});

export default store;
