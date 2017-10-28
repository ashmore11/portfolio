import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import rootReducer from 'reducers';

const configureStore = preloadedState =>
  createStore(rootReducer, preloadedState, applyMiddleware(ReduxThunk));

export default configureStore;
