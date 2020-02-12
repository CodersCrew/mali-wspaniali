import { Dispatch } from 'redux';
import * as constants from './constants';
import {firebase} from '../../firebase/Firebase';

export type Authenticate = {
  type?: constants.AUTHENTICATE;
  email: string;
  password: string;
  isAuthenticated?: boolean | null;    
  }


export type AuthenticationAction = Authenticate | Unauthenticate;

export const authenticate = (content: Authenticate) => {
  return (dispatch: Dispatch) => {

    firebase.auth.handleSignInWithEmailAndPassword(
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
      });
    });
  };
};


export interface Unauthenticate {
  type: constants.UNAUTHENTICATE;
}

export const unauthenticate = (): Unauthenticate => {
  return {
    type: constants.UNAUTHENTICATE,
  };
};
