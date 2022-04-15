import React, { Component } from "react";
import './App.css';
import { Container, Grid, Header, Image } from 'semantic-ui-react';
import TableSortable from './components/table';
import TableFilter from './components/filter';
import TablePagination from './components/pagination';
// import { BrowserRouter as Router } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Container className='App'>
        <Header className="App-header" as='h1' inverted textAlign='center'>
          Token Lists
          <span style={{fontSize:14, fontWeight:200}}>by </span><Image src="https://portaldefi.com/assets/portal-logo.gif" alt="Portal Logo" />
        </Header>
        <Grid textAlign='center' className="App-body">
          <Grid.Row>
            <Grid.Column>
              <TableFilter />
              <TableSortable />
              <TablePagination />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;
