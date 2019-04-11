import { combineReducers, createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import account from './account';

export default function configStore() {
  return createStore(
    combineReducers({
      account
    }),
    applyMiddleware(promiseMiddleware)
  );
}
