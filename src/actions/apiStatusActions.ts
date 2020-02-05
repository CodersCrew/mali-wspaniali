import { Action } from 'redux';

export const BEGIN_API_CALL = 'BEGIN_API_CALL';

export interface BeginApiCallAction extends Action<'BEGIN_API_CALL'> {
  type: 'BEGIN_API_CALL';
}

export function beginApiCall() {
    return { type: BEGIN_API_CALL };
} 