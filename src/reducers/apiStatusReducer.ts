import { initialState } from './initialState';
import { BEGIN_API_CALL, BeginApiCallAction } from '../actions/apiStatusActions';

function apiCallEnds(type: string) {
    return type.substring(type.length - 8) === '_SUCCESS' || type.substring(type.length - 8) === '_FAILURE';
}

export function apiCallStatusReducer(
    state = initialState.apiCallsInProgress,
    action: BeginApiCallAction
) {
    if (action.type === BEGIN_API_CALL) {
        return state + 1;
    }
    if (apiCallEnds(action.type)) {
       return state - 1;
    }
    return state;
}