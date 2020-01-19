import { Action, Dispatch } from 'redux';
import registerMock from '../serverMock';
import { RegistrationUser } from '../pages/RegistrationPage/types'

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';


export function registerUserSuccess(userData: object): any {
  return { type: REGISTER_USER_SUCCESS, userData };
}

export function registerUserFailure(userData: object): any {
  return { type: REGISTER_USER_FAILURE, userData };
}

export function registerUser(user: RegistrationUser) {
  return function(dispatch: Dispatch): Promise<void> {
    return registerMock(user.email, user.password)
      .then(response => {
        if (response.errors) {
          console.log(response.errors);
          dispatch(registerUserFailure(user));
        } else {
          dispatch(registerUserSuccess(user));
        }
      })
      .catch(error => {
        throw error;
      });
  };
}