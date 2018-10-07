import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider} from 'react-apollo';

// compoents
import ProgramList from './components/ProgramList';
import AddProgram from './components/AddProgram';

// reduce
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer)

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});


//

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store} >
          <div id="main" className="col-sm-4">>
            <h1>Program listing</h1>
            <ProgramList />
            <AddProgram />
          </div>
        </Provider>
      </ApolloProvider>
    );
  }
}