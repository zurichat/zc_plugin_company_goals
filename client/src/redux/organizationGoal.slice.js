import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  goal_name: '',
  description: '',
  goal_type: '',
  category: '',
  start_date: '',
  due_date: '',
};

export const createAndEditGoalSlice = createSlice({
  name: 'createAndEditGoalSlice',
  initialState,
});

export default createAndEditGoalSlice.reducer;
