import { createSlice } from '@reduxjs/toolkit';

export const editVisionSlice = createSlice({
  name: 'editVision',
  initialState: {
    showVision: false,
    vision: null
  },
  reducers: {
    showEditVisionModal: (state) => {
      state.showVision = !state.showVision;
    },
    saveVision: (state, action) => {
      state.vision = action.payload;
    },
    
  },
});

export const { showEditVisionModal, saveVision } = editVisionSlice.actions;

export default editVisionSlice.reducer;
