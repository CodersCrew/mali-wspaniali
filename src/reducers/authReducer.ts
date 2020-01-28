import {
  AUTHENTICATE,
  UNAUTHENTICATE,
} from '../../src/actions/authActions/constants';
import { loginActionTypes } from '../../src/actions/authActions/types';

export default function authReducer(
  state: loginActionTypes = {
    email: null,
    password: null,
    isAuthenticated: false,
  },
  action: any,
): loginActionTypes {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        isAuthenticated: true,
        email: action.email,
        password: action.password,
      };
    case UNAUTHENTICATE:
      return { ...state, isAuthenticated: false };
  }
  return state;
}
