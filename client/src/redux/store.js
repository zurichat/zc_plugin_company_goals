import { configureStore } from '@reduxjs/toolkit';

import editMissionReducer from './showEditMissionModal';
import editVisionReducer from './showEditVisionModal';


const store = configureStore({
    reducer: {
        showMission: editMissionReducer,
        showVision: editVisionReducer,
    },
});

export default store;