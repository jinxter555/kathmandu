import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider} from 'react-apollo';

// compoents
import ProgramList from './components/ProgramList';
import AddProgram from './components/AddProgram';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Program listing</h1>
          <ProgramList />
          <AddProgram />
        </div>
      </ApolloProvider>
    );
  }
}
