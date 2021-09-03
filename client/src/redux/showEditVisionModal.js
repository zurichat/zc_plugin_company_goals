import { createSlice } from '@reduxjs/toolkit';

export const editVisionSlice = createSlice({
  name: 'editVision',
  initialState: {
    showVision: false,
  },
  reducers: {
    showEditVisionModal: (state) => {
      state.showVision = !state.showVision;
    },
  },
});

export const { showEditVisionModal } = editVisionSlice.actions;

export default editVisionSlice.reducer;
