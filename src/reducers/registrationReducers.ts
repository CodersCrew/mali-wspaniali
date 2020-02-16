import { UserInfo } from '@firebase/auth-types';
import {
  REGISTER_USER_SUCCESS,
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
    default:
      return state;
  }
}
