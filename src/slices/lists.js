import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ListDataService from '../services/querylists';
import _ from 'lodash';

const initialList = [
  { name: 'Bitcoin', chain: 'bitcoin', symbol: 'BTC', logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png', tags: [], address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" },
  { name: 'Avalanche', chain: 'binance', symbol: 'AVAX', logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png', tags: [], address: "0x1ce0c2827e2ef14d5c4f29a091d735a204794041" },
  { name: 'Cosmos', chain: 'osmosis', symbol: 'ATOM', logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3794.png', tags: [], address: "cosmosxxxxxxxxxxxxxxxx" },
  { name: 'Dogecoin', chain: 'ethereum', symbol: 'renDOGE', logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png', tags: [], address: "0x3832d2F059E55934220881F831bE501D180671A7" },
  { name: 'Ethereum', chain: 'ethereum', symbol: 'ETH', logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png', tags: [], address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" },
];
export const retrieveLists = createAsyncThunk(
  "lists/all",
  async () => {
    // const res = await ListDataService.getAll();
    const res = await Promise.all([
      ListDataService.get(1),
      ListDataService.get(2),
      ListDataService.get(3),
      ListDataService.get(4),
      ListDataService.get(5),
      ListDataService.get(6),
    ]);
    // return res.data?.contents;
    return res.map(res => JSON.parse(res.data?.contents)).reduce((prev, cur) => {
      return {
        count: prev.count + cur.count,
        tokens: [...prev.tokens, ...cur.tokens]
      };
    }, { count: 0, tokens: [] }).tokens;
  }
);
export const retrieveChainId = createAsyncThunk(
  "lists/findByChain",
  async (chainId) => {
    const res = await ListDataService.get(chainId);
    return JSON.parse(res.data?.contents).tokens;
  }
);
export const findItemsByText = createAsyncThunk(
  "lists/findByText",
  async ({ text }) => {
    const res = await ListDataService.findByText(text);
    const filteredList = res.data.filter((data) =>  JSON.stringify(data).toLowerCase().indexOf(text.toLowerCase()) !== -1);
    return filteredList ? filteredList : null;
  }
);

const listSlice = createSlice({
  name: 'lists',
  initialState: initialList,
  reducers: {
    changeSort: (state, action) => {
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        }
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: 'ascending',
      }
    }
  },
  extraReducers: builder => {
    // async reducers
    builder.addCase(retrieveLists.fulfilled, (state, action) => {
      return [...action.payload];
    });
    builder.addCase(retrieveChainId.fulfilled, (state, action) => {
      return [...action.payload];
    });
    builder.addCase(findItemsByText.fulfilled, (state, action) => {
      return [...action.payload];
    });
  },
});

export const { changeSort } = listSlice.actions;
const { reducer } = listSlice;
export default reducer;