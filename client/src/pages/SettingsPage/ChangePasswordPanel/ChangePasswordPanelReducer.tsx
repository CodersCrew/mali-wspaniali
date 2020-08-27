import { validateNewPassword } from './ChangePasswordPanelFormControls';
import { ChangePasswordPanelStateInterface } from './ChangePasswordPanelFormControls/types';

export const CHANGE_OLD_PASSWORD = 'CHANGE_OLD_PASWORD';
export const CHANGE_NEW_PASSWORD = 'CHANGE_NEW_PASWORD';
export const CHANGE_CONFIRM_PASSWORD = 'CHANGE_CONFIRM_PASWORD';
export const TOGGLE_OLD_PASSWORD_VISIBILITY = 'TOGGLE_OLD_PASSWORD_VISIBILITY';
export const TOGGLE_NEW_PASSWORD_VISIBILITY = 'TOGGLE_NEW_PASSWORD_VISIBILITY';
export const TOGGLE_CONFIRM_PASSWORD_VISIBILITY = 'TOGGLE_CONFIRM_PASSWORD_VISIBILITY';
export const UPDATE_HELPER_TEXT = 'UPDATE_HELPER_TEXT';
export const EMAIL_IS_CORRECT = 'EMAIL_IS_CORRECT';

export const ChangePasswordPanelInitialState: ChangePasswordPanelStateInterface = {
    changePasswordButtonDisabled: true,
    confirmNewPassword: '',
    confirmNewPasswordDisabled: true,
    newPassword: '',
    newPasswordDisabled: true,
    oldPassword: '',
    oldPasswordError: false,
    oldPasswordHelperText: '',
    showOldPassword: false,
    showNewPassword: false,
    showConfirmNewPassword: false,
};

export const ChangePasswordPanelReducer = (
    state: typeof ChangePasswordPanelInitialState,
    action: { type: string; payload?: { [p: string]: string | boolean } },
): ChangePasswordPanelStateInterface => {
    if (action.type === CHANGE_OLD_PASSWORD) {
        if (action.payload) {
            if (typeof action.payload.value === 'string') {
                return { ...state, oldPassword: action.payload.value, newPassword: '', newPasswordDisabled: true };
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
        return { ...state, oldPasswordError: false, oldPasswordHelperText: '', newPasswordDisabled: false };
    }

    if (action.type === CHANGE_NEW_PASSWORD) {
        if (action.payload) {
            if (typeof action.payload.value === 'string') {
                const { special, capital, digit, length } = validateNewPassword(action.payload.value);
                if (special && capital && digit && length) {
                    return { ...state, newPassword: action.payload.value, confirmNewPasswordDisabled: false };
                }

                return { ...state, newPassword: action.payload.value };
            }
        }
    }

    if (action.type === TOGGLE_NEW_PASSWORD_VISIBILITY) {
        return { ...state, showNewPassword: !state.showNewPassword };
    }

    if (action.type === CHANGE_CONFIRM_PASSWORD) {
        if (action.payload) {
            if (typeof action.payload.value === 'string') {
                if (action.payload.value === state.newPassword) {
                    return { ...state, confirmNewPassword: action.payload.value, changePasswordButtonDisabled: false };
                }

                return { ...state, confirmNewPassword: action.payload.value };
            }
        }
    }

    if (action.type === TOGGLE_CONFIRM_PASSWORD_VISIBILITY) {
        return { ...state, showConfirmNewPassword: !state.showConfirmNewPassword };
    }

    return state;
};
