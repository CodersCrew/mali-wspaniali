import { combineReducers } from "redux";
import users from "./registrationReducers";

const rootReducer = combineReducers({
  users
});

export default rootReducer;
