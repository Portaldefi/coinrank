import { configureStore } from '@reduxjs/toolkit';
import listReducer from './slices/lists';
import filterReducer from './slices/filters';
import filteredListReducer from './slices/filteredList';

const reducer = {
  lists: listReducer,
  filters: filterReducer,
  filteredList: filteredListReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export default store;