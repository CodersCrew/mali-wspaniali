import { ChangePasswordPanelState } from './ChangepasswordPanelFormControls/interfaces';

export const CHANGE_OLD_PASSWORD = 'CHANGE_OLD_PASWORD';
export const EMAIL_IS_CORRECT = 'EMAIL_IS_CORRECT';
export const TOGGLE_OLD_PASSWORD_VISIBILITY = 'TOGGLE_OLD_PASSWORD_VISIBILITY';
export const UPDATE_HELPER_TEXT = 'UPDATE_HELPER_TEXT';

export const ChangePasswordPanelInitialState: ChangePasswordPanelState = {
    oldPassword: '',
    oldPasswordError: false,
    oldPasswordHelperText: '',
    showOldPassword: false,
};

export const ChangePasswordPanelReducer = (
    state: ChangePasswordPanelState,
    action: { type: string; payload?: { [p: string]: string | boolean } },
): ChangePasswordPanelState => {
    if (action.type === CHANGE_OLD_PASSWORD) {
        if (action.payload) {
            if (typeof action.payload.value === 'string') {
                return {
                    ...state,
                    oldPassword: action.payload.value,
                    oldPasswordError: false,
                    oldPasswordHelperText: '',
                };
            }
        }
    }

    if (action.type === TOGGLE_OLD_PASSWORD_VISIBILITY) {
        return { ...state, showOldPassword: !state.showOldPassword };
    }

    if (action.type === UPDATE_HELPER_TEXT) {
        if (action.payload) {
            if (typeof action.payload.value === 'string') {
                return { ...state, oldPasswordError: true, oldPasswordHelperText: action.payload.value };
            }
        }
    }

    if (action.type === EMAIL_IS_CORRECT) {
        return { ...state, oldPasswordError: false, oldPasswordHelperText: '' };
    }

    return state;
};
