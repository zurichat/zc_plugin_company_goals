import { createSlice } from '@reduxjs/toolkit';

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    showSnackbar: false,
    snackbarContent: '',
    snackbarSeverity: 'info',
  },
  reducers: {
    activateSnackbar: (state, { payload }) => {
      state.showSnackbar = true;
      state.snackbarContent = payload.content || 'Are you okay';
      state.snackbarSeverity = payload.severity || 'error';
    },
    deactivateSnackbar: (state) => {
      state.showSnackbar = false;
    },
  },
});

export const { activateSnackbar, deactivateSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
