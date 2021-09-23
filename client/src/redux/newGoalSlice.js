import { createSlice } from '@reduxjs/toolkit';

export const newGoalSlice = createSlice({
  name: 'newGoal',
  initialState: {
    selectedGoal: null,
    success: '',
    error: '',
  },
  reducers: {
    saveGoal: (state, action) => {
      if (typeof action.payload === 'object') {
        // eslint-disable-next-line no-param-reassign
        state.selectedGoal = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.success = 'Goals successfully created';
        // eslint-disable-next-line no-param-reassign
        state.error = '';
      } else {
        // eslint-disable-next-line no-param-reassign
        state.error = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.success = '';
      }
    },
  },
});

export const { saveGoal } = newGoalSlice.actions;

export const selectGoal = (state) => state.goal.selectedGoal;
export default newGoalSlice.reducer;
