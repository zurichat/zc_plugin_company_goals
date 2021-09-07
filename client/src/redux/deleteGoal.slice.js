import { createSlice } from '@reduxjs/toolkit';

export const deleteGoalSlice = createSlice({
  name: 'deleteGoalModal',
  initialState: {
    showDeleteGoalModal: false,
  },
  reducers: {
    deleteGoalAction: (state) => {
      state.showDeleteGoalModal = true;
    },
    closeDeleteGoalModal: (state) => {
      state.showDeleteGoalModal = false;
    },
  },
});

export const { deleteGoalAction, closeDeleteGoalModal } = deleteGoalSlice.actions;

export default deleteGoalSlice.reducer;
