import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import account from './account';
import feature from './feature';

export default function configStore() {
  return createStore(
    combineReducers({
      account,
      feature
    }),
    applyMiddleware(promiseMiddleware, reduxThunk)
  );
}
