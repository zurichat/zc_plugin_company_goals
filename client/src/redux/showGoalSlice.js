/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit';

     export const getGoals = createAsyncThunk('showGoal/getGoals', async (getAllGoalsUrl) => {
       const response = await axios.get(getAllGoalsUrl);
       return response.data;
      }
     )

export const showGoalSlice = createSlice({
  name: 'showGoal',
  initialState: {
    goals: null,
    status: null,
    errorInfo: null
  },
  extraReducers: {
    [getGoals.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getGoals.fulfilled]: (state, { payload }) => {
      state.goals = payload.data;
      state.status = 'success';
    },
    [getGoals.rejected]: (state, {error}) => {   
      state.errorInfo = error;
      state.status = 'failed';
    },
  },
});

export default showGoalSlice.reducer;
