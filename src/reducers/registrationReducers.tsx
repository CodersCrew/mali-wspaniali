import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from '../actions/registrationActions';

export default function registrationReducer (state = {}, action: any) {
    interface Users {
        [key: number]: string;
    }
    let key: number;
    let newState: Users;

    console.log(action.userData);

    switch (action.type) {
      case REGISTER_USER_SUCCESS:
        key = Object.keys(state).length;
        newState = { ...state };
        newState[key] = action.userData;
        return newState;
      case REGISTER_USER_FAILURE:
        console.log('error');
        return state;
      default:
        return state;
    }
}