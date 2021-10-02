// import axios from 'axios';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// export const fetchOrgVision = createAsyncThunk('showVision/getVision', async (orgId) => {
//     const response = await axios.get(
//         `https://goals.zuri.chat/api/v1/goals/single-goal-progress?org_id=${orgId || '6145d099285e4a184020742e'}&goal_id=${goalData._id}`;
//     return response.data;
//   });

/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const getAverageProgress = createAsyncThunk('showProgress/getProgress', async () => {
  const response = await axios.get('https://goals.zuri.chat/api/v1/goals/average-goal-progress?org_id=${orgId || }&goal_id=${goalData._id}');
  return response;
});
export const showGoalSlice = createSlice({
  name: 'showGoal',
  initialState: {
    averageProgress: null,
  },
  reducers: {
    goalSorted(state, action) {
      state.goals = action.payload;
    },
  },
  extraReducers: {
    [getAverageProgress.fulfilled]: (state, { payload }) => {
      state.goals = payload.data;
      state.status = 'success';
    },
    [getAverageProgress.rejected]: (state, { error }) => {
      state.errorInfo = error;
      state.status = 'failed';
    },
  },
});
export const { goalSorted } = showGoalSlice.actions;
export default showGoalSlice.reducer;