import { REGISTER_USER } from '../actions/registrationActions'

export default function registrationReducer (state = {}, action: any) {
    interface Users {
        [key: number]: string;
    }
    let key: number;
    let newState: Users;

    switch (action.type) {
      case REGISTER_USER:
        key = Object.keys(state).length;
        newState = { ...state };
        newState[key] = action.userData;
        return newState;
      default:
        return state;
    }
}