import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import feature from './feature';

export default function configStore() {
  return createStore(
    combineReducers({
      feature
    }),
    applyMiddleware(promiseMiddleware, reduxThunk)
  );
}
