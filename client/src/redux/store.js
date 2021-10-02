import { configureStore } from '@reduxjs/toolkit';
import deleteGoalReducer from './deleteGoal.slice';
import missionReducer from './organizationMission.slice';
import newGoalReducer from './newGoalSlice';
import notificationReducer from './notificationSlice';
import pieChartReducer from './pieChartSlice';
import createAndEditGoalReducer from './organizationGoal.slice';
import visionReducer from './organizationVision.slice';
import showGoalSliceReducer from './showGoalSlice';
import snackbarReducer from './snackbar.slice';
import createGoalModalReducer from './toggleCreateGoalModal.slice';
import editGoalModalReducer from './toggleEditGoalModal.slice';
import likeGoalReducer from './likeGoalSlice';
import storeOrganizationRoomReducer from './organizationRoom.slice';
import TargetModalSliceReducer from './TargetModalSlice';
import pageNumSlice from './pageNumSlice';

const store = configureStore({
  reducer: {
    workspaceUsers: getWorkspaceUsersReducer,
    organizationMission: missionReducer,
    organizationVision: visionReducer,
    toggleCreateGoalModal: createGoalModalReducer,
    toggleEditGoalModal: editGoalModalReducer,
    deleteGoal: deleteGoalReducer,
    newGoal: newGoalReducer,
    snackbar: snackbarReducer,
    showGoals: showGoalSliceReducer,
    pageNum: pageNumSlice,
    organizationCreateAndEditGoal: createAndEditGoalReducer,
    pieChart: pieChartReducer,
    notifications: notificationReducer,
    organizationCreateAndEditGoalData: createAndEditGoalReducer,
    likeGoals: likeGoalReducer,
    organizationRoom: storeOrganizationRoomReducer,
    targetModal: TargetModalSliceReducer,
  },
});

export default store;
