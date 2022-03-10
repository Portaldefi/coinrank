import _ from 'lodash'
import React from 'react'
import { Table, Icon } from 'semantic-ui-react'

const tableData = [
  { name: 'Bitcoin', price: 35000, ticker: 'BTC', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png' },
  { name: 'Ethereum', price: 2000, ticker: 'ETH', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
  { name: 'Cosmos', price: 30, ticker: 'ATOM', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3794.png' },
  { name: 'Dogecoin', price: 0.21, ticker: 'DOGE', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png' },
]

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
  const { column, data, direction } = state

  return (
    <Table sortable celled fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === 'name' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}
          >
            Name
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'price' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'price' })}
            textAlign='right'
          >
            Price
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'ticker' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'ticker' })}
            textAlign='right'
          >
            Change %
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      
      <Table.Body>
        {data.map(({ price, ticker, name, icon }) => (
          <Table.Row key={name}>
            <Table.Cell className="tokenName">
              <h4 className="ui image header">
                <img src={icon} 
                     alt={name + " icon"}
                     className="ui mini rounded image" />
                <div className="content">
                  {name}
                  <div className="sub header">{ticker}</div>
                </div>
              </h4>
            </Table.Cell>
            <Table.Cell textAlign='right'>${price.toFixed(2).toLocaleString()}</Table.Cell>
            <Table.Cell textAlign='right'>{changePercentage()}%</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default TableSortable