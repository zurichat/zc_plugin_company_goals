import { createSlice } from '@reduxjs/toolkit';

export const deleteGoalSlice = createSlice({
  name: 'deleteGoalModal',
  initialState: {
    showDeleteConfirmationModal: false,
    showDeleteSuccessModal: false,
    showDeleteErrorModal: false,
  },
  reducers: {
    deleteConfirmationAction: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.showDeleteConfirmationModal = !state.showDeleteConfirmationModal;
    },
    deleteSuccessAction: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.showDeleteSuccessModal = !state.showDeleteSuccessModal;
    },
    deleteErrorAction: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.showDeleteErrorModal = !state.showDeleteErrorModal;
    }
  },
});

export const {
  deleteConfirmationAction,
  deleteSuccessAction,
  deleteErrorAction
} = deleteGoalSlice.actions;

export default deleteGoalSlice.reducer;
