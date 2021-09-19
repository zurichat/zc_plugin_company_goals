import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateOrgVision = createAsyncThunk('editVision/updateOrgVisionStatus', async (visionText) => {
  console.log(visionText);
  /**
   * TODO:
   * Refactor to dynamically retrieve token on login.
   * As currently done, token would have to be manually edited everytime it expires.
   */
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TWpBeU9UVTJOWHhIZDNkQlIwUlplRTVFVFRST1ZFVjZXa1JCZVU5RVVtbFplbHBvVDFSSmVVMTZWbXROWnowOWZNc1ZKa2hCeXFaSGhSZHBqd2JhbzB6VWhBa2dVdGJmWTBqUkJXWEV5RTE3IiwiZW1haWwiOiJ1c2VyMUBnb2Fscy5jb20iLCJpZCI6IjYxNDM4NTEzZDAyODRiYzZhOTIyMzVkMiIsIm9wdGlvbnMiOnsiUGF0aCI6Ii8iLCJEb21haW4iOiIiLCJNYXhBZ2UiOjYzMDcyMDAwMDAsIlNlY3VyZSI6ZmFsc2UsIkh0dHBPbmx5IjpmYWxzZSwiU2FtZVNpdGUiOjB9LCJzZXNzaW9uX25hbWUiOiJmNjgyMmFmOTRlMjliYTExMmJlMzEwZDNhZjQ1ZDVjNyJ9.lXxwVBTJk_b6u__3t0VgCaQhe59KaXPW5d__2dYUMas';
  const organizationId = '6145d099285e4a184020742e';
  const response = await axios.patch(
    `/api/v1/vision/${organizationId}/`,
    { vision: visionText },
    { authorization: token }
  );
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
