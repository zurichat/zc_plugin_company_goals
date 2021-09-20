import { configureStore } from '@reduxjs/toolkit';
import deleteGoalReducer from './deleteGoal.slice';
import editMissionReducer from './editMission.slice';
import newGoalReducer from './newGoalSlice';
import createAndEditGoalReducer from './organizationGoal.slice';
import visionReducer from './organizationVision.slice';
import showGoalSliceReducer from './showGoalSlice';
import snackbarReducer from './snackbar.slice';
import createGoalModalReducer from './toggleCreateGoalModal.slice';
import editGoalModalReducer from './toggleEditGoalModal.slice';
import likeGoalReducer from './likeGoalSlice';
import getVisionSliceReducer from './getVisionSlice';

const store = configureStore({
  reducer: {
    editMission: editMissionReducer,
    organizationVision: visionReducer,
    toggleCreateGoalModal: createGoalModalReducer,
    toggleEditGoalModal: editGoalModalReducer,
    deleteGoal: deleteGoalReducer,
    newGoal: newGoalReducer,
    snackbar: snackbarReducer,
    goals: showGoalSliceReducer,
    organizationCreateAndEditGoalData: createAndEditGoalReducer,
    likeGoals: likeGoalReducer,
    getVision: getVisionSliceReducer,
  },
});

export default store;
