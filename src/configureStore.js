import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';

import monteCarloTreeSearchReducer, { monteCarloTreeSearchEpic } from './monteCarloTreeSearchRedux';

export const history = createHistory();
const rootReducer = combineReducers({
  connectFour: monteCarloTreeSearchReducer,

});
const epicMiddleware = createEpicMiddleware();

const store = createStore(
  connectRouter(history)(rootReducer),
  applyMiddleware(epicMiddleware, routerMiddleware(history)),
);

epicMiddleware.run(combineEpics(monteCarloTreeSearchEpic));

export default store;
