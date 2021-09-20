import { createSlice } from '@reduxjs/toolkit';

export const visionApiSlice = createSlice({
  name: 'deleteGoalModal',
  initialState: {
    showVisionModal: false,
  },
  reducers: {
    deleteVisionAction: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.showVisionModal = true;
    },
    closeVisionModal: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.showVisionModal = false;
    },
  },
});

export const { deleteVisionAction, closeVisionModal } = visionApiSlice.actions;

export default visionApiSlice.reducer;
