import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import monteCarloTreeSearchReducer from './monteCarloTreeSearchRedux';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.css';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  monteCarloTreeSearchReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable no-underscore-dangle */
const target = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  target,
);

registerServiceWorker();
