import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateOrgVision = createAsyncThunk('editVision/updateOrgVisionStatus', async (visionText) => {
  console.log(visionText);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TVRrNU1qVTBOM3hIZDNkQlIwUlplRTVFVW10UFJFWm9UbXBKTWs5RWFHdFpWRlY2VFVSS2FGa3lUWHBOZHowOWZOZy16Q2wwclFtTjlVdXA1Tm5NNDk2U0V4Tk1IR1lrVUJOZE9YWVo4MDU2IiwiZW1haWwiOiJjcmVhdG9yQGdvYWxzLmNvbSIsImlkIjoiNjE0NGQ4MWE2MjY4OGRhNTMwMmFjYzMzIiwib3B0aW9ucyI6eyJQYXRoIjoiLyIsIkRvbWFpbiI6IiIsIk1heEFnZSI6NjMwNzIwMDAwMCwiU2VjdXJlIjpmYWxzZSwiSHR0cE9ubHkiOmZhbHNlLCJTYW1lU2l0ZSI6MH0sInNlc3Npb25fbmFtZSI6ImY2ODIyYWY5NGUyOWJhMTEyYmUzMTBkM2FmNDVkNWM3In0.Rj8b8Kqnv8xcJ9Nugv8t-hdMV-VlYPHqLYwp9xwtZ7M';
  const organizationId = '6145d099285e4a184020742e';
  const response = await axios.patch('/api/v1/vision/1/?token=admin', { vision: visionText }, { authorization: token });
  return response.data;
});

export const editVisionSlice = createSlice({
  name: 'editVision',
  initialState: {
    showVisionModal: false,
    vision: null,
    loading: false,
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

      state.vision = payload.update;
      state.showVisionModal = !state.showVisionModal;
      state.loading = false;
      return state;
    });
    builder.addCase(updateOrgVision.rejected, (state, action) => {
      console.log('Error!!!', action);
      alert(action.error.message);
      state.loading = false;
      return state;
    });
    builder.addCase(updateOrgVision.pending, (state, action) => {
      console.log('loading...', action);
      state.loading = true;
      return state;
    });
  },
});

export const { showEditVisionModal, saveVision, extraReducers } = editVisionSlice.actions;

export default editVisionSlice.reducer;
