import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import registerMock from '../serverMock';
import {
  RegistrationUser,
  RegistrationState,
} from '../pages/RegistrationPage/types';

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

interface RegisterUserSuccessAction extends Action<'REGISTER_USER_SUCCESS'> {
  type: typeof REGISTER_USER_SUCCESS;
  userData: RegistrationUser;
}

interface RegisterUserFailureAction extends Action<'REGISTER_USER_FAILURE'> {
  type: typeof REGISTER_USER_FAILURE;
}

export type RegistrationActions =
  | RegisterUserSuccessAction
  | RegisterUserFailureAction;

export function registerUserSuccess(
  userData: RegistrationUser,
): RegisterUserSuccessAction {
  return { type: REGISTER_USER_SUCCESS, userData };
}

export function registerUserFailure(): RegisterUserFailureAction {
  return { type: REGISTER_USER_FAILURE };
}

export const registerUser = (
  user: RegistrationUser,
): ThunkAction<void, RegistrationState, null, Action<string>> | void => {
  return function(dispatch: Dispatch): Promise<void> {
    return registerMock(user.email, user.password)
      .then(response => {
        if (response.errors) {
          console.log(response.errors);
          dispatch(registerUserFailure());
        } else {
          dispatch(registerUserSuccess(user));
        }
      })
      .catch(error => {
        throw error;
      });
  };
};

export type registerUserType = typeof registerUser;
