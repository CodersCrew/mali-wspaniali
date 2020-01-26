import { ThunkDispatch as Dispatch } from 'redux-thunk';
import { loginActionTypes } from './types';
import * as constants from './constants';

export interface IAuthenticate {
  type: constants.AUTHENTICATE;
}
export function authenticate(): IAuthenticate {
  return {
    type: constants.AUTHENTICATE,
  };
}
export interface IUnauthenticate {
  type: constants.UNAUTHENTICATE;
}
export function unauthenticate(): IUnauthenticate {
  return {
    type: constants.UNAUTHENTICATE,
  };
}
export type AuthenticationAction = IAuthenticate | IUnauthenticate;
