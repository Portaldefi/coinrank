import _ from 'lodash'
import React from 'react'
import { Table, Icon } from 'semantic-ui-react'

const tableData = [
  { name: 'Bitcoin', chain: 'bitcoin', symbol: 'BTC', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png', tags: [], address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" },
  { name: 'Avalanche', chain: 'binance', symbol: 'AVAX', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png', tags: [], address: "0x1ce0c2827e2ef14d5c4f29a091d735a204794041" },
  { name: 'Cosmos', chain: 'osmosis', symbol: 'ATOM', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3794.png', tags: [], address: "cosmosxxxxxxxxxxxxxxxx" },
  { name: 'Dogecoin', chain: 'ethereum', symbol: 'renDOGE', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png', tags: [], address: "0x3832d2F059E55934220881F831bE501D180671A7" },
  { name: 'Ethereum', chain: 'ethereum', symbol: 'ETH', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png', tags: [], address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" },
];
// 4k+ tokens
// name symbol address  decimals logoURI chainID lists listLength urlOfList 

function tokenReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_SORT':
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
    default:
      throw new Error()
  }
}

function changePercentage() {
  const percentage = Math.floor(Math.random() * 201) - 100;
  return (
    <span color={(percentage > 0 ? 'green': 'red')}>
      <Icon name={"caret "+(percentage > 0 ? 'up': 'down')} color={(percentage > 0 ? 'green': 'red')} />
      {percentage.toString().replace(/-(?=\d)/,"")}
    </span>
    );
}

function TableSortable() {
  const [state, dispatch] = React.useReducer(tokenReducer, {
    column: null,
    data: tableData,
    direction: null,
  })
  const { column, data, direction, address } = state

  return (
    <Table sortable celled className='tableList'>
      <Table.Header>
        <Table.Row >
          <Table.HeaderCell className='theadL'
            sorted={column === 'name' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}
          >
            Name
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'symbol' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'symbol' })}
            textAlign='right'
          >
            Symbol
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'chain' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'chain' })}
            textAlign='right'
          >
            Chain
          </Table.HeaderCell>
          <Table.HeaderCell className='theadR'
            sorted={column === 'address' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'address' })}
            textAlign='right'
          >
            Address
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      
      <Table.Body>
        {data.map(({ chain, symbol, name, icon, address, tags }) => (
          <Table.Row key={name}>
            <Table.Cell className="tokenName">
              <h4 className="ui image header">
                <img src={icon} 
                     alt={name + " icon"}
                     className="ui mini rounded image" />
                <div className="content">
                  {name}
                  <div className="sub header">{symbol}</div>
                </div>
              </h4>
            </Table.Cell>
            {/* <Table.Cell textAlign='right'>${chain.toFixed(2).toLocaleString()}</Table.Cell> */}
            {/* <Table.Cell textAlign='right'>{changePercentage()}%</Table.Cell> */}
            <Table.Cell textAlign='right'>{symbol}</Table.Cell>
            <Table.Cell textAlign='right'>{chain}</Table.Cell>
            <Table.Cell textAlign='right'>{address}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default TableSortable