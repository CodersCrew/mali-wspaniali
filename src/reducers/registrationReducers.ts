import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  RegistrationActions,
} from '../actions/registrationActions';
import { RegistrationUser } from '../pages/RegistrationPage/types';
import { initialState } from './initialState';

export function userReducer(
  state = initialState.user,
  action: RegistrationActions,
): RegistrationUser {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        email: action.userData.email,
        password: action.userData.password,
      }
    case REGISTER_USER_FAILURE:
      console.log('error');
      return state;
    default:
      return state;
  }
}
