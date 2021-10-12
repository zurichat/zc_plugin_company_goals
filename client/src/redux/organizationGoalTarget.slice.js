import { createSlice } from '@reduxjs/toolkit';

export const organizationGoalTargetSlice = createSlice({
  name: 'organizationGoalTarget',
  initialState: {
    showGoalTargetModal: false,
  },
  reducers: {
    toggleShowOrganizationGoalTargetForm: (state) => {
      state.showGoalTargetModal = !state.showGoalTargetModal;
    },
  },
});

export const { toggleShowOrganizationGoalTargetForm } = organizationGoalTargetSlice.actions;

export default organizationGoalTargetSlice.reducer;
