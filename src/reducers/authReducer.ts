import { IAuthenticate, IUnauthenticate } from '../../src/actions/authActions';
import {
  AUTHENTICATE,
  UNAUTHENTICATE,
} from '../../src/actions/authActions/constants';
import { loginActionTypes } from '../../src/actions/authActions/types';

export default function authReducer(
  state: loginActionTypes = {
    uuid: null,
    isAuthenticated: null,
  },
  action: IAuthenticate | IUnauthenticate,
): loginActionTypes {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        uuid: 'placeholder-uuid',
        isAuthenticated: true,
      };
    case UNAUTHENTICATE:
      return { uuid: null, isAuthenticated: false };
  }
  return state;
}
