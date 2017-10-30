import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

const firebaseConfig = {
  apiKey: 'AIzaSyDazvyybJmssoCAIQ5pzwQhSJd_LOkFDzQ',
  authDomain: 'scorching-fire-8072.firebaseapp.com',
  databaseURL: 'https://scorching-fire-8072.firebaseio.com',
  projectId: 'scorching-fire-8072',
  storageBucket: 'scorching-fire-8072.appspot.com',
  messagingSenderId: '500917944104'
};

const rrfConfig = {
  userProfile: 'users'
};

firebase.initializeApp(firebaseConfig);

const rootReducer = combineReducers({
  firebase: firebaseStateReducer
});

const configureStore = (preloadedState = {}) => {
  const extMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__
    ? [window.__REDUX_DEVTOOLS_EXTENSION__()]
    : [];

  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      ...extMiddleware,
      applyMiddleware(ReduxThunk),
      reactReduxFirebase(firebase, rrfConfig) // firebase instance as first argument
    )
  );

  return store;
};

export default configureStore;
