import { createSlice } from '@reduxjs/toolkit';

const initialState= {
      likes: 0,
      dislikes: 0
}
const likeGoalSlice = createSlice({
      name: 'like',
      initialState,
      reducers: {
     addLike(state, action){
       state.likes = state.likes + action.payload
     },
     addDisLike(state, action){
           state.dislikes = state.dislikes + action.payload
     },
      }
})

export const {addLike, addDisLike} = likeGoalSlice.actions
export default likeGoalSlice.reducer