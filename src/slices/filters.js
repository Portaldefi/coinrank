import { createSlice } from '@reduxjs/toolkit';

const initialFilter = {
  sources: [],
  chains: [],
  searchTerm: ''
};

const filterSlice = createSlice({
  name: 'filters',
  initialState: initialFilter,
  reducers: {
    updateSources: (state, action) => {
      console.log(action);
      state.sources = [...action.payload];
    },
    updateChains: (state, action) => {
      state.chains = action.payload;
    },
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearSearchTerm: (state, action) => {
      state.searchTerm = '';
    }
  },
});

export const { updateSources, updateChains, updateSearchTerm, clearSearchTerm } = filterSlice.actions;

const { reducer } = filterSlice;

export default reducer;