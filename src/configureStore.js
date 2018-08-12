import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';

import connectFourReducer from './connectFour/redux';
import pandemicReducer, { simulatePandemicEpic } from './pandemic/redux';

export const history = createHistory();
const rootReducer = combineReducers({
  connectFour: connectFourReducer,
  pandemic: pandemicReducer,
});
const epicMiddleware = createEpicMiddleware();

const store = createStore(
  connectRouter(history)(rootReducer),
  applyMiddleware(epicMiddleware, routerMiddleware(history)),
);

epicMiddleware.run(combineEpics(
  // TODO Enable Connect 4 simulation again
  // simulateConnectFourEpic,
  simulatePandemicEpic,
));

export default store;
