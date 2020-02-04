import { UserInfo } from '@firebase/auth-types';
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  RegistrationActions,
} from '../actions/registrationActions';
import { initialState } from './initialState';

export function userReducer(
  state = initialState.user,
  action: RegistrationActions,
): Pick<UserInfo, 'email'> {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        email: action.userData.email,
      };
    case REGISTER_USER_FAILURE:
      return state;
    default:
      return state;
  }
}
