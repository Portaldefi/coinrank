import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Pagination } from 'semantic-ui-react';

// Fabric Types
// import FabricComponent from '@fabric/http';

import { updatePageIndex } from '../slices/filters';

class PaginationReact extends Component {
  constructor(props) {
    super(props);


    this.state = Object.assign({
      pageCount: 1,
    });

    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!_.isEqual(this.props.lists, nextProps.lists)) {
      this.setState({pageCount: Math.ceil(nextProps.lists.length / nextProps.filters.pageSize)});
      return false;
    }
    if (!_.isEqual(this.props.filters, nextProps.filters)) {
      if (this.props.filters.pageSize !== nextProps.filters.pageSize) {
        this.setState({pageCount: Math.ceil(nextProps.lists.length / nextProps.filters.pageSize)});
      }
      if (this.props.filters.page !== nextProps.filters.page) {
        return true;
      }
      return false;
    }
    if (!_.isEqual(this.state, nextState)) {
      return true;
    }
    return false;
  }

  handlePaginationChange(e, { activePage }) {
    this.props.updatePageIndex(activePage - 1);
  }
  
  render() {
    const { pageCount } = this.state;
    const { 
      // lists, 
      filters } = this.props;
    const { page
      // , pageSize
    } = filters;
    console.log(filters);

    return (
      <Pagination
        totalPages={pageCount}
        activePage={page + 1}
        onPageChange={this.handlePaginationChange}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state.filteredList,
    filters: state.filters,
  }
};

const mapDispatchToProps = {
  updatePageIndex
};
export default connect(mapStateToProps, mapDispatchToProps)(PaginationReact);