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
      if ((typeof action.payload === 'object')) {
        state.selectedGoal = action.payload;
        state.success = 'Goals successfully created';
        state.error = '';
      } else {
        state.error = action.payload;
        state.success= ''
      }
    },
  },
});

export const { saveGoal } = newGoalSlice.actions;

export const selectGoal = (state) => state.goal.selectedGoal;
export default newGoalSlice.reducer;
