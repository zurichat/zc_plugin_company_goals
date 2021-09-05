import { createSlice } from '@reduxjs/toolkit';

export const editVisionSlice = createSlice({
  name: 'editVision',
  initialState: {
    showVisionModal: false,
    vision: null,
  },
  reducers: {
    showEditVisionModal: (state) => {
      state.showVisionModal = !state.showVisionModal;
    },
    saveVision: (state, action) => {
      state.vision = action.payload;
    },
  },
});

export const { showEditVisionModal, saveVision } = editVisionSlice.actions;

export default editVisionSlice.reducer;
