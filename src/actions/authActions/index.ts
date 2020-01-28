import axios from 'axios';
import { Dispatch } from 'redux';
import * as constants from './constants';

type IAuthenticate = {
  type?: constants.AUTHENTICATE;
  email: String | null;
  password: String | null;
  isAuthenticated?: boolean | null;
};

export type AuthenticationAction = IAuthenticate | IUnauthenticate;

export const authenticate = (content: IAuthenticate) => (
  dispatch: Dispatch,
) => {
  axios
    .post('https://6q7yl104k.sse.codesandbox.io/login', content)
    .then(res => {
      dispatch({
        type: constants.AUTHENTICATE,
        content,
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export interface IUnauthenticate {
  type: constants.UNAUTHENTICATE;
}

export const unauthenticate = (): IUnauthenticate => {
  return {
    type: constants.UNAUTHENTICATE,
  };
};
