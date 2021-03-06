import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';

import connectFourReducer, { simulateConnectFourEpic } from './connectFour/redux';

export const history = createHistory();
const rootReducer = combineReducers({
  connectFour: connectFourReducer,

});
const epicMiddleware = createEpicMiddleware();

const store = createStore(
  connectRouter(history)(rootReducer),
  applyMiddleware(epicMiddleware, routerMiddleware(history)),
);

epicMiddleware.run(combineEpics(
  simulateConnectFourEpic,
));

export default store;
