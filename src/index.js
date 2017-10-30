import 'app/index.scss';

import React from 'react';
import { render } from 'react-dom';

import Root from 'containers/Root';

import configureStore from 'app/store/configureStore';

const store = configureStore();

render(<Root store={store} />, document.getElementById('app'));
