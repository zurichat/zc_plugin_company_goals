import { configureStore } from '@reduxjs/toolkit';

import deleteGoalReducer from './deleteGoal.slice';
import editMissionReducer from './showEditMissionModal';
import editVisionReducer from './showEditVisionModal';
import createGoalModalReducer from './toggleCreateGoalModal.slice';
import editGoalModalReducer from './toggleEditGoalModal.slice';

const store = configureStore({
  reducer: {
    showMission: editMissionReducer,
    showVision: editVisionReducer,
    toggleCreateGoalModal: createGoalModalReducer,
    toggleEditGoalModal: editGoalModalReducer,
    deleteGoal: deleteGoalReducer,
  },
});

export default store;
