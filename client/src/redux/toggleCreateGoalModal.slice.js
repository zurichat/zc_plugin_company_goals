import { createSlice } from '@reduxjs/toolkit';

export const createGoalModalSlice = createSlice({
  name: 'createGoalModal',
  initialState: {
    showCreateGoalModal: false,
  },
  reducers: {
    toggleCreateGoalModalAction: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.showCreateGoalModal = !state.showCreateGoalModal;
    },
  },
});

export const { toggleCreateGoalModalAction } = createGoalModalSlice.actions;

export default createGoalModalSlice.reducer;
