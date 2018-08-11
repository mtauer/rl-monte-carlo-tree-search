import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router';

import store, { history } from './configureStore';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.css';

const target = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/connect-4" />
        </Route>
        <Route exact path="/connect-4" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  target,
);

registerServiceWorker();
