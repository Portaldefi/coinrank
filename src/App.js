import './App.css';
import { Container, Grid, Header, Image } from 'semantic-ui-react';
import TableSortable from './components/table';


function App() {
  return (
    <Container className='App'>
      <Header className="App-header" as='h1' inverted textAlign='center'>
        <Image src="https://portaldefi.com/assets/portal-logo.gif" alt="Portal Logo" />
        <span>Token List</span>
      </Header>
      <Grid textAlign='center' className="App-body">
        <Grid.Row>
          <Grid.Column>
            <TableSortable />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default App;
