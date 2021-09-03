import { configureStore } from '@reduxjs/toolkit';

import editVisionReducer from './showEditVisionModal';

const store = configureStore({
  reducer: {
    show: editVisionReducer,
  },
});

export default store;
