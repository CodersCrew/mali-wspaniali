import { initialState } from './initialState';
import { BEGIN_API_CALL } from '../actions/apiStatusActions';

function actionTypeEndsInSuccess(type: string) {
    return type.substring(type.length - 8) === "_SUCCESS";
}

export function apiCallStatusReducer(
    state = initialState.apiCallsInProgress,
    action: any
) {
    if (action.type === BEGIN_API_CALL) {
        return 1;
    // eslint-disable-next-line no-else-return
    } else if (actionTypeEndsInSuccess(action.type)) {
        return 0;
    }
    return state;
}