/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getGoals = createAsyncThunk('showGoal/getGoals', async () => {
  return fetch('https://goals.zuri.chat/api/v1/goals?org_id=6145d099285e4a184020742e').then(
    (res) => res.json()
    //  console.log(res.json(), "response")
  );
});
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
  },
  reducers: {
    goalSorted(state, action) {
      state.goals = action.payload;
    },
    errorInfo: null,
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
