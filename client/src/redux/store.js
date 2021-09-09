import { configureStore } from '@reduxjs/toolkit';

import deleteGoalReducer from './deleteGoal.slice';
import newGoalReducer from './newGoalSlice';
import visionReducer from './organizationVision.slice';
import editMissionReducer from './showEditMissionModal';
import createGoalModalReducer from './toggleCreateGoalModal.slice';
import editGoalModalReducer from './toggleEditGoalModal.slice';

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
