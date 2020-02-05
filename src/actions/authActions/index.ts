import axios from 'axios';
import { Dispatch } from 'redux';
import * as constants from './constants';

type IAuthenticate = {
  type?: constants.AUTHENTICATE;
  email: string;
  password: string;
  isAuthenticated?: boolean | null;
};

export type AuthenticationAction = IAuthenticate | IUnauthenticate;

export const authenticate = (content: IAuthenticate) => {
  return (dispatch: Dispatch, getState: any, {getFirebase}: any) => {

    const firebase = getFirebase();
  //axios.post('https://6q7yl104k.sse.codesandbox.io/login', content)
    firebase.auth().signInWithEmailAndPassword(
      content.email,
      content.password
    ).then((res: any) => {
      dispatch({
        type: constants.AUTHENTICATE,
        content,
      });
    })
    .catch((error: any) => {
      console.log(error);
      dispatch({
        type: constants.UNAUTHENTICATE,
        error,
      })
    });
  }
};


export interface IUnauthenticate {
  type: constants.UNAUTHENTICATE;
}

export const unauthenticate = (): IUnauthenticate => {
  return {
    type: constants.UNAUTHENTICATE,
  };
};
