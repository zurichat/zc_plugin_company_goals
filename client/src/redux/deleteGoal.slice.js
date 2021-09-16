import { createSlice } from '@reduxjs/toolkit';

export const deleteGoalSlice = createSlice({
  name: 'deleteGoalModal',
  initialState: {
    showDeleteGoalModal: false,
  },
  reducers: {
    deleteGoalAction: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.showDeleteGoalModal = true;
    },
    closeDeleteGoalModal: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.showDeleteGoalModal = false;
    },
  },
});

export const { deleteGoalAction, closeDeleteGoalModal } = deleteGoalSlice.actions;

export default deleteGoalSlice.reducer;
