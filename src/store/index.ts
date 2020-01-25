import { createStore, applyMiddleware, Store } from 'redux';
import thunk from "redux-thunk";
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from "../reducers";

function configureStore(): Store {
    return createStore(
      reducers,
      undefined,
      composeWithDevTools(
        applyMiddleware(thunk, reduxImmutableStateInvariant()),
      ),
    );
}

export default configureStore;
 