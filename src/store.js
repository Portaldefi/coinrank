import { configureStore } from '@reduxjs/toolkit';
import listReducer from './slices/lists';

const reducer = {
  lists: listReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export default store;