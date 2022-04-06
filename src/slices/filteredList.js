import { createSlice } from '@reduxjs/toolkit';

const initialList = [];

const filteredListSlice = createSlice({
  name: 'filteredList',
  initialState: initialList,
  reducers: {
    updateList: (state, action) => {
      return [...action.payload];
    }
  },
});

export const { updateList } = filteredListSlice.actions;

const { reducer } = filteredListSlice;

export default reducer;