import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import feature from './feature';
import account from './account';

export default function configStore() {
  return createStore(
    combineReducers({
      feature,
      account
    }),
    applyMiddleware(promiseMiddleware, reduxThunk)
  );
}
