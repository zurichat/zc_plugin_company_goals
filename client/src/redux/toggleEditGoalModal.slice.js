import { createSlice } from '@reduxjs/toolkit';

export const editGoalModalSlice = createSlice({
  name: 'editGoalModal',
  initialState: {
    showEditGoalModal: false,
  },
  reducers: {
    toggleEditGoalModalAction: (state) => {
      state.showEditGoalModal = !state.showEditGoalModal;
    },
  },
});

export const { toggleEditGoalModalAction } = editGoalModalSlice.actions;

export default editGoalModalSlice.reducer;
