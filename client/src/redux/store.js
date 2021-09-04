import { configureStore } from '@reduxjs/toolkit';

import editVisionReducer from './showEditVisionModal';
import editModalReducer from './editDialogSlice';

const store = configureStore({
  reducer: {
    show: editVisionReducer,
    editModal: editModalReducer
  },
});

export default store;
