import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  goal_name: '',
  goal_description: '',
  goal_type: '',
  goal_category: '',
  goal_start_date: '',
  goal_due_date: '',
};

export const createAndEditGoalSlice = createSlice({
  name: 'createAndEditGoalSlice',
  initialState,
});

export default createAndEditGoalSlice.reducer;
