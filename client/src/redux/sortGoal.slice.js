/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getGoal = createAsyncThunk('sortGoals/getGoals', async (sortValue) => {
  console.log(sortValue);
  return fetch(
    `https://goals.zuri.chat/api/v1/goals?org_id=6145d099285e4a184020742e&page=1&limit=1&sort=${sortValue}`
  ).then(
    (res) => res.json()
    //  console.log(res.json(), "response")
  );
});

export const sortGoalSlice = createSlice({
  name: 'sortGoal',
  initialState: {
    sorted: [getGoal],
  },
});

export default sortGoalSlice.reducer;
