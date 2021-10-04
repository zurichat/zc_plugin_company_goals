/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const getGoals = createAsyncThunk('showGoal/getGoals', async (getAllGoalsUrl) => {
  const response = await axios.get(getAllGoalsUrl);
  return response;
});
export const showGoalSlice = createSlice({
  name: 'showGoal',
  initialState: {
    goals: null,
    status: '',
    errorInfo: null,
  },
  reducers: {
    goalSorted(state, action) {
      state.goals = action.payload;
    },
    SetStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: {
    [getGoals.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getGoals.fulfilled]: (state, { payload }) => {
      state.goals = payload.data;
      state.status = 'success';
    },
    [getGoals.rejected]: (state, { error }) => {
      state.errorInfo = error;
      state.status = 'failed';
    },
  },
});
export const { goalSorted, SetStatus } = showGoalSlice.actions;
export default showGoalSlice.reducer;

// /* eslint-disable no-param-reassign */
// import axios from 'axios';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const getGoals = createAsyncThunk('showGoal/getGoals', async (getAllGoalsUrl) => {
//   const response = await axios.get(getAllGoalsUrl);
//   return response.data;
// });

// export const showGoalSlice = createSlice({
//   name: 'showGoal',
//   initialState: {
//     goals: null,
//     status: null,
//     errorMessage: null,
//     errorInfo: null,
//     pageNum: 1,
//   },
//   reducers: {
//     goalSorted(state, action) {
//       state.goals = action.payload;
//     },
//     // goalPaginated(state, action) {
//     //   state.pageNum = action.payload;
//     // },
//   },
//   extraReducers: {
//     [getGoals.pending]: (state, action) => {
//       state.status = 'loading';
//     },
//     [getGoals.fulfilled]: (state, { payload }) => {
//       state.goals = payload.data;
//       state.status = 'success';
//     },

//     [getGoals.rejected]: (state, { error }) => {
//       state.errorMessage = error.message;
//     },
//     [getGoals.rejected]: (state, { error }) => {
//       state.errorInfo = error;
//       state.status = 'failed';
//     },
//   },
// });

// export default showGoalSlice.reducer;
