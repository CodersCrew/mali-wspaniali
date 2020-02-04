import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { UserInfo } from '@firebase/auth-types';
import {
  RegistrationUser,
  RegistrationState,
} from '../pages/RegistrationPage/types';
import { firebase } from '../firebase/Firebase';
import { beginApiCall } from './apiStatusActions';

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

type ThunkResult<S, A> = ThunkAction<void, S, null, Action<A>> | void;
export type RegisterUserType = (user: RegistrationUser) => Promise<void> 
// export type RegisterUserType = (
//   user: RegistrationUser,
// ) => ThunkResult<RegistrationState, RegistrationActions>;

// NOTE: Remove after connecting to the DB 
// - I added it so I don't have comment out many parts of the code
// function CreateUserWithEmailAndPassword(
//   email: string,
//   password: string,
// ): Promise<DummyReturn> {
//   return new Promise((resolve, reject) => {
//     setTimeout(function(){
//       reject();
//     }, 3000);
//   });
// }
 
// type DummyReturn = {
//   errors: boolean;
// };

// export const registerUser = (
//   user: RegistrationUser,
// ): ThunkResult<RegistrationState, RegistrationActions> => {
//   return function(dispatch: Dispatch): Promise<void> {
    
//     return CreateUserWithEmailAndPassword(user.email, user.password)
//       .then(response => {
//         if (!response.errors) {
//           dispatch(registerUserSuccess(user));
//           return;
//         }
//         console.log(response.errors);
//         dispatch(registerUserFailure());
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };
// };


export const registerUser = (
  user: RegistrationUser,
): ThunkResult<RegistrationState, RegistrationActions> => {
  return (dispatch: Dispatch): Promise<void> => {
    return firebase.auth.handleCreateUserWithEmailAndPassword(
      user.email,
      user.password,
    ).then((userData) => {
      if (userData.user) {
        dispatch(registerUserSuccess({
            email: userData.user.email
        }));
      } else {
        dispatch(registerUserFailure());
        throw new Error('Something went wrong');
      }
    }).catch((error) => {
      dispatch(registerUserFailure());
      throw new Error(error.message);
    });
  }

  // return async (dispatch: Dispatch): Promise<void> => {
  //   dispatch(beginApiCall());
  //   try {
  //       const userData = await firebase.auth.handleCreateUserWithEmailAndPassword(
  //         user.email,
  //         user.password,
  //       );
  //       if (userData.user) {
  //         dispatch(registerUserSuccess({
  //             email: userData.user.email
  //         }));
  //       } else {
  //         dispatch(registerUserFailure('Something went wrong'));
  //       }
  //   } catch (error) {
  //       dispatch(registerUserFailure(error.message));
  //   }
  // };
};