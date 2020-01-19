import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from '../actions/registrationActions';
import { Users } from '../pages/RegistrationPage/types';

export default function registrationReducer (state = {}, action: any): Users {
    let key: number;
    let newState: Users;

    switch (action.type) {
      case REGISTER_USER_SUCCESS:
        key = Object.keys(state).length;
        newState = { ...state };
        newState[key] = action.userData;
        return newState;
      case REGISTER_USER_FAILURE:
        console.log('error');
        return state;
      default:
        return state;
    }
}