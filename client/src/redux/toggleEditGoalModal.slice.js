import { createSlice } from '@reduxjs/toolkit';

export const editGoalModalSlice = createSlice({
  name: 'editGoalModal',
  initialState: {
    showEditGoalModal: false,
    name: 'Test',
    owner: 'Mark Essien',
    status: false,
    endDate: '02/12/2019',
    category: 'Web development',
    description: 'This is a dummy data',
  },
  reducers: {
    toggleEditGoalModalAction: (state) => {
      state.showEditGoalModal = !state.showEditGoalModal;
    },
  },
});

export const { toggleEditGoalModalAction } = editGoalModalSlice.actions;

export default editGoalModalSlice.reducer;
