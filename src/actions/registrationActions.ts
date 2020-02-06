import { Action, Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { UserInfo } from '@firebase/auth-types';
import { RegistrationUser } from '../pages/RegistrationPage/types';
import { createUser } from '../queries/userQueries';

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

interface RegisterUserSuccessAction extends Action<'REGISTER_USER_SUCCESS'> {
  type: 'REGISTER_USER_SUCCESS';
  userData: Pick<UserInfo, 'email'>
}

interface RegisterUserFailureAction extends Action<'REGISTER_USER_FAILURE'> {
  type: 'REGISTER_USER_FAILURE';
}

export type RegistrationActions =
  | RegisterUserSuccessAction
  | RegisterUserFailureAction;

export function registerUserSuccess(
  userData: Pick<UserInfo, 'email'>
): RegisterUserSuccessAction {
  return { type: REGISTER_USER_SUCCESS, userData };
}

export function registerUserFailure(): RegisterUserFailureAction {
  return { type: REGISTER_USER_FAILURE };
}

export type RegisterUserType = (user: RegistrationUser) => Promise<void> 

export const registerUser: ActionCreator<ThunkAction<Promise<void>, string, RegistrationUser,
 RegistrationActions>> = (user: RegistrationUser) => {
  return (dispatch: Dispatch): Promise<void> => {
    return createUser(user)
      .then(userData => {
        if (userData) {
          dispatch(
            registerUserSuccess({
              email: userData.email,
            }),
          );
        } else {
          dispatch(registerUserFailure());
          // These errors are handled in handleSubmit in registration form
          throw new Error('Something went wrong');
        }
      })
      .catch(error => {
        dispatch(registerUserFailure());
        throw new Error(error.message);
      });
  };
};
