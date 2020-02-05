import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { userReducer } from './registrationReducers';

const rootReducer = combineReducers({
  auth: authReducer,
  userReducer,
});

export default rootReducer;
