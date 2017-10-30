import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from 'containers/App';
import Home from 'containers/Home';

import { ROUTES } from 'helpers/config';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route path={ROUTES.get('home').path} exact component={Home} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
