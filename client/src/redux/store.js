import { configureStore } from '@reduxjs/toolkit';

<<<<<<< HEAD
const store = configureStore({
  reducer: {},
=======
import editVisionReducer from './showEditVisionModal';

const store = configureStore({
  reducer: {
    show: editVisionReducer,
  },
>>>>>>> 0fb3cc7efb716e7a716fdc27928f9fa3f418f0e9
});

export default store;
