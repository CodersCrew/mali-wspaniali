import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  RegistrationActions,
} from '../actions/registrationActions';
import { RegistrationState } from '../pages/RegistrationPage/types';

const initialState: RegistrationState = {email: '', password: ''};

export function userReducer(
  state = initialState,
  action: RegistrationActions,
): RegistrationState {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return action.userData;
    case REGISTER_USER_FAILURE:
      console.log('error');
      return state;
    default:
      return state;
  }
}
