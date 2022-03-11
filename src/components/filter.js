import _ from 'lodash'
import React from 'react'
import { Search, Grid, Header, Segment, Dropdown, Button } from 'semantic-ui-react'

const listOptions = [
  {
    key: '1inch',
    text: '1inch',
    value: '1inch'
  },
  {
    key: 'cmc-defi',
    text: 'CMC DeFi',
    value: 'cmc-defi',

  },
  {
    key: 'cmc-stablecoin',
    text: 'CMC Stablecoin',
    value: 'cmc-stablecoin',
  },
  {
    key: 'cmc200-erc20',
    text: 'CMC200 ERC20',
    value: 'cmc200-erc20',
  },
  {
    key: 'coingecko',
    text: 'CoinGecko',
    value: 'coingecko',

  },
  {
    key: 'coingecko-defi-100',
    text: 'CoinGecko DeFi 100',
    value: 'coingecko-defi-100',
  },
  {
    key: 'compound',
    text: 'Compound',
    value: 'compound',

  },
  {
    key: 'uniswap-labs-list',
    text: 'Uniswap Labs List',
    value: 'uniswap-labs-list',
  },
  {
    key: 'wrapped-tokens',
    text: 'Wrapped Tokens',
    value: 'wrapped-tokens',
  },
  {
    key: 'yearn',
    text: 'Yearn',
    value: 'yearn',

  },
  {
    key: 'zapper-token-list',
    text: 'Zapper Token List',
    value: 'zapper-token-list',
  }
];
const chainOptions = [
  {
    key: 'bitcoin',
    text: 'Bitcoin',
    value: 'bitcoin'
  },
  {
    key: 'avalanche',
    text: 'Avalanche',
    value: 'avalanche',

  },
  {
    key: 'binance',
    text: 'Binance',
    value: 'binance',

  },
  {
    key: 'cosmos',
    text: 'Cosmos',
    value: 'cosmos',

  },
  {
    key: 'ethereum',
    text: 'Ethereum',
    value: 'ethereum',

  },
  {
    key: 'polkadot',
    text: 'Polkadot',
    value: 'polkadot',

  },
  {
    key: 'solana',
    text: 'Solana',
    value: 'solana',

  }
];
const showOptions = [
  {
    key: '5',
    text: '5',
    value: '5'
  },
  {
    key: '10',
    text: '10',
    value: '10',

  },
  {
    key: '20',
    text: '20',
    value: '20',

  },
  {
    key: '50',
    text: '50',
    value: '50',

  },
  {
    key: '100',
    text: '100',
    value: '100',

  },
];

const source = [{
  title: '',
  description: '',
  image: '',
  price: '',}
];

const initialState = {
  loading: false,
  results: [],
  value: '',
}

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results }
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection }

    default:
      throw new Error()
  }
}

function TableFilter() {
  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;

  const timeoutRef = React.useRef();
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' })
        return
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i')
      const isMatch = (result) => re.test(result.title)

      dispatch({
        type: 'FINISH_SEARCH',
        results: _.filter(source, isMatch),
      })
    }, 300)
  }, []);
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, []);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={8}>
          <Dropdown
            placeholder='List Source'
            fluid
            multiple
            search
            selection
            options={listOptions}
          />
          </Grid.Column>
          <Grid.Column width={8}>
          <Dropdown
            placeholder='Chain'
            fluid
            multiple
            search
            selection
            options={chainOptions}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column floated='left' width={2} textAlign='left' verticalAlign='bottom' style={{color: '#fff'}}>
            &nbsp;Show {' '}
            <Dropdown 
              inline
              options={showOptions}
              defaultValue={showOptions[0].value}
            />
        </Grid.Column>
        <Grid.Column floated='right' width={5} textAlign='right' verticalAlign='bottom' >
          <Search
            loading={loading}
            placeholder='Search...'
            onResultSelect={(e, data) =>
              dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
            }
            onSearchChange={handleSearchChange}
            results={results}
            value={value}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default TableFilter