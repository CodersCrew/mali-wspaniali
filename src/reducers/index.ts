import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { userReducer } from './registrationReducers';

export const rootReducer = combineReducers({
  auth: authReducer,
  userReducer,
});
