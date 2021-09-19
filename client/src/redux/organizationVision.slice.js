import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateOrgVision = createAsyncThunk('editVision/updateOrgVisionStatus', async (visionText) => {
  console.log(visionText);
  const response = await axios.post('/api/vision', { visionText });
  return response.data;
});

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
      // state.showVisionModal = !state.showVisionModal;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateOrgVision.fulfilled, (state, { payload }) => {
      console.log('success-edit-vison', payload);
    });
  },
});

export const { showEditVisionModal, saveVision } = editVisionSlice.actions;

export default editVisionSlice.reducer;
