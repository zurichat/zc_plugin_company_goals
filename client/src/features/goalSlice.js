import { createSlice } from '@reduxjs/toolkit';

export const goalSlice = createSlice({
  name: 'goal',
  initialState: {
    selectedGoal: null,
  },
  reducers: {
    getGoal: (state, action) => {
      state.selectedGoal = action.payload;
    },
    editGoal: (state, action) => {
      state.selectedGoal = {
        ...state.selectedGoal,
        ...action.payload,
      };
    },
  },
});

export const { getGoal, editGoal } = goalSlice.actions;

export const selectGoal = (state) => state.goal.selectedGoal;
export default goalSlice.reducer;


