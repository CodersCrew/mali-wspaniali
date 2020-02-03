import { combineReducers } from "redux";
import { userReducer } from './registrationReducers';
import { apiCallStatusReducer } from './apiStatusReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  apiCallsInProgress: apiCallStatusReducer,
});
