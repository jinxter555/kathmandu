import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider} from 'react-apollo';

// compoents
import MainApp from './MainApp';

// reduce
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer,
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store} >
          <div id="app-loader">
            <MainApp />
          </div>
        </Provider>
      </ApolloProvider>
    );
  }
}