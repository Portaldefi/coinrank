import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Table, Icon } from 'semantic-ui-react';

// Fabric Types
// import FabricComponent from '@fabric/http';

import { chainOptions } from './filter.js';
import { retrieveLists, retrieveChainId
  , findItemsByText
  // , changeSort
} from '../slices/lists';
import { updateSort } from '../slices/filters';

// const tableData = [
//   { name: 'Bitcoin', chain: 'bitcoin', symbol: 'BTC', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png', tags: [], address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" },
//   { name: 'Avalanche', chain: 'binance', symbol: 'AVAX', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png', tags: [], address: "0x1ce0c2827e2ef14d5c4f29a091d735a204794041" },
//   { name: 'Cosmos', chain: 'osmosis', symbol: 'ATOM', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3794.png', tags: [], address: "cosmosxxxxxxxxxxxxxxxx" },
//   { name: 'Dogecoin', chain: 'ethereum', symbol: 'renDOGE', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png', tags: [], address: "0x3832d2F059E55934220881F831bE501D180671A7" },
//   { name: 'Ethereum', chain: 'ethereum', symbol: 'ETH', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png', tags: [], address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" },
// ];
// 4k+ tokens
// name symbol address  decimals logoURI chainID lists listLength urlOfList 

class TableSortable extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({
      column: null,
      data: [],
      direction: null,
      address: null,
    });
  }

  componentDidMount() {
    this.props.retrieveLists();
  }

  shouldComponentUpdate(nextProps) {
    if (!_.isEqual(this.props.lists, nextProps.lists)) {
      return true;
    }
    if (!_.isEqual(this.props.filters, nextProps.filters)) {
      if (!_.isEqual(this.props.filters.chains, nextProps.filters.chains)) {
        this.props.retrieveChainId(nextProps.filters.chains[0]);
        return false;
      }
      return true;
    }
    return false;
  }
  
  dispatchFunction = (e) => {
    // Only enable sorting for smaller lists
    if(this.props.data.length < 1000) this.dispatch(e);

  }

  changePercentage() {
    const percentage = Math.floor(Math.random() * 201) - 100;
    return (
      <span color={(percentage > 0 ? 'green': 'red')}>
        <Icon name={"caret "+(percentage > 0 ? 'up': 'down')} color={(percentage > 0 ? 'green': 'red')} />
        {percentage.toString().replace(/-(?=\d)/,"")}
      </span>
      );
  }

  tokenRenderer(token) {
    const { 
      chain, 
      symbol, name, logoURI, address
      // , tags
    } = token;
    return (
      <Table.Row key={name}>
        <Table.Cell className="tokenName">
          <h4 className="ui image header">
            <img src={logoURI} 
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
    );
  }

  render() {
    const { column, direction
      // , data
     } = this.state;
    const { lists, filters } = this.props;
    const { page, pageSize } = filters;

    return (
      <Table sortable celled className='tableList'>
        <Table.Header>
          <Table.Row >
            <Table.HeaderCell className='theadL'
              sorted={column === 'name' ? direction : null}
              onClick={() => this.props.updateSort('name')}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'symbol' ? direction : null}
              onClick={() => this.props.updateSort('symbol')}
              textAlign='right'
            >
              Symbol
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'chain' ? direction : null}
              onClick={() => this.props.updateSort('chain')}
              textAlign='right'
            >
              Chain
            </Table.HeaderCell>
            <Table.HeaderCell className='theadR'
              sorted={column === 'address' ? direction : null}
              onClick={() => this.props.updateSort('address')}
              textAlign='right'
            >
              Address
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        
        <Table.Body>
          {lists
            .slice(page * pageSize, (page + 1) * pageSize)
            .map(list => ({ ...list, chain: chainOptions.find(option => list.chainId === option.value)?.text }))
            .map(this.tokenRenderer)
          }
        </Table.Body>
      </Table>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state.filteredList,
    filters: state.filters,
  }
};

const mapDispatchToProps = {
  retrieveLists, 
  retrieveChainId,
  findItemsByText,
  updateSort,
};
export default connect(mapStateToProps, mapDispatchToProps)(TableSortable);