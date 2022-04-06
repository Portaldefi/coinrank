import { createSlice } from '@reduxjs/toolkit';

const initialFilter = {
  sources: [],
  chains: [1],
  searchTerm: '',
  page: 0,
  pageSize: 5,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState: initialFilter,
  reducers: {
    updateSources: (state, action) => {
      state.sources = [...action.payload];
    },
    updateChains: (state, action) => {
      state.chains = action.payload;
    },
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    updatePageIndex: (state, action) => {
      state.page = action.payload;
    },
    updatePageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    clearSearchTerm: (state, action) => {
      state.searchTerm = '';
    }
  },
});

export const { updateSources, updateChains, updateSearchTerm, updatePageIndex, updatePageSize, clearSearchTerm } = filterSlice.actions;

const { reducer } = filterSlice;

export default reducer;