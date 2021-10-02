/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getGoals = createAsyncThunk('showGoal/getGoals', async (getAllGoalsUrl) => {
  const response = await axios.get(getAllGoalsUrl);
  return response.data;
});

export const showGoalSlice = createSlice({
  name: 'showGoal',
  initialState: {
    goals: null,
    status: null,
    errorMessage: null,
    errorInfo: null,
    pageNumber: 1,
  },
  reducers: {
    goalSorted(state, action) {
      state.goals = action.payload;
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
      state.errorMessage = error.message;
    },
    [getGoals.rejected]: (state, { error }) => {
      state.errorInfo = error;
      state.status = 'failed';
    },
  },
});

export const { goalSorted } = showGoalSlice.actions;
export default showGoalSlice.reducer;
