import { createStore, compose } from 'redux';
import rootReducer from 'reducers';
import { FIREBASE } from 'helpers/config';
import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from 'firebase';

firebase.initializeApp(FIREBASE.get('config'));

export default function configureStore(initialState, history) {
  const extMiddleware =
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f;

  const createStoreWithMiddleware = compose(
    reactReduxFirebase(firebase, FIREBASE.get('rrfConfig')),
    extMiddleware
  )(createStore);

  const store = createStoreWithMiddleware(rootReducer);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
