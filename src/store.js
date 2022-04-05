import { configureStore } from '@reduxjs/toolkit';
import listReducer from './slices/lists';
import filterReducer from './slices/filters';

const reducer = {
  lists: listReducer,
  filters: filterReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export default store;