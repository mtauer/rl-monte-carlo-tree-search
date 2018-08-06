import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import monteCarloTreeSearchReducer, { monteCarloTreeSearchEpic } from './monteCarloTreeSearchRedux';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.css';

const epicMiddleware = createEpicMiddleware();
const store = createStore(
  monteCarloTreeSearchReducer,
  applyMiddleware(epicMiddleware),
);
epicMiddleware.run(combineEpics(monteCarloTreeSearchEpic));
const target = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  target,
);

registerServiceWorker();
