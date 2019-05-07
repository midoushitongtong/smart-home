import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import feature from './feature';
import personUser from './person-user';

export default function configStore() {
  return createStore(
    combineReducers({
      feature,
      personUser
    }),
    applyMiddleware(promiseMiddleware, reduxThunk)
  );
}
