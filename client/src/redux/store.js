import { configureStore } from '@reduxjs/toolkit';
import deleteGoalReducer from './deleteGoal.slice';
import missionReducer from './organizationMission.slice';
import newGoalReducer from './newGoalSlice';
import notificationReducer from './notificationSlice';
import createAndEditGoalReducer from './organizationGoal.slice';
import visionReducer from './organizationVision.slice';
import showGoalSliceReducer from './showGoalSlice';
import snackbarReducer from './snackbar.slice';
import createGoalModalReducer from './toggleCreateGoalModal.slice';
import editGoalModalReducer from './toggleEditGoalModal.slice';
import likeGoalReducer from './likeGoalSlice';
import storeOrganizationRoomReducer from './organizationRoom.slice';

const store = configureStore({
  reducer: {
    organizationMission: missionReducer,
    organizationVision: visionReducer,
    toggleCreateGoalModal: createGoalModalReducer,
    toggleEditGoalModal: editGoalModalReducer,
    deleteGoal: deleteGoalReducer,
    newGoal: newGoalReducer,
    snackbar: snackbarReducer,
    goals: showGoalSliceReducer,
    organizationCreateAndEditGoal: createAndEditGoalReducer,
    notifications: notificationReducer,
    organizationCreateAndEditGoalData: createAndEditGoalReducer,
    likeGoals: likeGoalReducer,
    organizationRoom: storeOrganizationRoomReducer,
  },
});

export default store;
