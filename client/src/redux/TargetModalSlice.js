/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const ToggleModalSlice = createSlice({
  name: 'ToggleModal',
  initialState: {
    showModal: 0,
  },
  reducers: {
    openModal(state) {
      state.showModal = 1;
    },
    closeModal(state) {
      state.showModal = 0;
    },
  },
});

export const { openModal, closeModal } = ToggleModalSlice.actions;

export default ToggleModalSlice.reducer;
