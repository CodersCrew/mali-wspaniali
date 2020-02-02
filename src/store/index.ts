import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from '../reducers';

let middleware = applyMiddleware(thunk, reduxImmutableStateInvariant())

if (process.env.NODE_ENV !== 'production') {
  middleware = composeWithDevTools(middleware);
}

export function configureStore(): Store {
  return createStore(rootReducer, undefined, middleware);
}

