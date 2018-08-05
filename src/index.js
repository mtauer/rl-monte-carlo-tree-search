import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import monteCarloTreeSearchReducer, { monteCarloTreeSearchEpic } from './monteCarloTreeSearchRedux';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.css';

const epicMiddleware = createEpicMiddleware();
const enhancers = [];
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-underscore-dangle
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}
const store = createStore(
  monteCarloTreeSearchReducer,
  compose(applyMiddleware(epicMiddleware), ...enhancers),
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
