import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isEditing: {
    status: false,
    goalId: '',
  },
  goalFormData: {
    goal_name: '',
    description: '',
    goal_type: '',
    category: '',
    start_date: '',
    due_date: '',
  },
};

export const createAndEditGoalSlice = createSlice({
  name: 'createAndEditGoalSlice',
  initialState,
  reducers: {
    editGoalData: (state, { payload }) => {
      state.isEditing = { ...payload.isEditing };
      state.goalFormData = { ...payload.editGoalData };
    },
    resetGoalFormData: (state, action) => initialState,
  },
});

export const { editGoalData, resetGoalFormData } = createAndEditGoalSlice.actions;

export default createAndEditGoalSlice.reducer;
