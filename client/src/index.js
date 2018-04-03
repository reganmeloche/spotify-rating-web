import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';

import App from './App';
import reducers from './reducers/index';

const store = createStore(reducers, {}, applyMiddleware(reduxPromise));
//const store = createStore(() => [], {}, applyMiddleware());

ReactDOM.render(
  <Provider store={store}><App/></Provider>, 
  document.querySelector('#root')
);
