import { combineReducers } from 'redux';
import { firebaseStateReducer as firebase } from 'react-redux-firebase';

import project from './project';

const rootReducer = combineReducers({
  firebase
});

export default rootReducer;
