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
  const response = await axios.get('https://goals.zuri.chat/api/v1/goals/average-goal-progress?org_id= 6145d099285e4a184020742e');
  return response;
});
export const averageGoalSlice = createSlice({
  name: 'averageGoal',
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
  },
});
export const { goalSorted } = averageGoalSlice.actions;
export default averageGoalSlice.reducer;