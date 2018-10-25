import React, { Component } from 'react';
//import ApolloClient from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

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


const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql'
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
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