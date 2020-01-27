import { combineReducers } from "redux";
import { registrationReducer } from './registrationReducers';

export const rootReducer = combineReducers({
  registrationReducer,
});

