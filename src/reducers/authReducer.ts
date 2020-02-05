import {
  AUTHENTICATE,
  UNAUTHENTICATE,
} from '../../src/actions/authActions/constants';
import { loginActionTypes } from '../../src/actions/authActions/types';


const initState:any = {
    email: null,
    password: null,
    isAuthenticated: false, 
}

const authReducer:any = ( state:any = initState, action: any) => {
  switch (action.type) {
    case AUTHENTICATE:
      console.log('Login success!')
      return {
        ...state,
        isAuthenticated: true,
        email: action.email,
        password: action.password,
      };
    case UNAUTHENTICATE:
      return { ...state, isAuthenticated: false };
    
  }
  return state;
}

export default authReducer


