import { createSlice } from '@reduxjs/toolkit';

export const editVisionSlice = createSlice({
  name: 'editVision',
  initialState: {
    show: false,
  },
  reducers: {
    showEditVisionModal: (state) => {
      state.show = !state.show;
    },
  },
});

export const { showEditVisionModal } = editVisionSlice.actions;

export default editVisionSlice.reducer;
