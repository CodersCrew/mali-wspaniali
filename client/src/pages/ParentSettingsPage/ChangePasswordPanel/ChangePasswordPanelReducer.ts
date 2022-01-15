export const CHANGE_OLD_PASSWORD = 'CHANGE_OLD_PASWORD';
export const EMAIL_IS_CORRECT = 'EMAIL_IS_CORRECT';
export const TOGGLE_OLD_PASSWORD_VISIBILITY = 'TOGGLE_OLD_PASSWORD_VISIBILITY';
export const UPDATE_HELPER_TEXT = 'UPDATE_HELPER_TEXT';
export const PASSWORD_RESET_EMAIL_SENT = 'PASSWORD_RESET_EMAIL_SENT';

export interface ChangePasswordPanelState {
    oldPassword: string;
    oldPasswordDisabled: boolean;
    oldPasswordError: boolean;
    oldPasswordHelperText: string;
    showOldPassword: boolean;
    resetPasswordButtonDisabled: boolean;
}

export const ChangePasswordPanelInitialState: ChangePasswordPanelState = {
    oldPassword: '',
    oldPasswordDisabled: false,
    oldPasswordError: false,
    oldPasswordHelperText: '',
    showOldPassword: false,
    resetPasswordButtonDisabled: false,
};

export interface ChangePasswordPanelComponentsProps {
    state: ChangePasswordPanelState;
    dispatch: React.Dispatch<{ type: string; payload?: { [p: string]: string | boolean } | undefined }>;
}
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
                return {
                    ...state,
                    oldPasswordError: true,
                    oldPasswordHelperText: action.payload.value,
                };
            }
        }
    }

    if (action.type === EMAIL_IS_CORRECT) {
        return {
            ...state,
            oldPasswordError: false,
            oldPasswordHelperText: '',
            oldPasswordDisabled: true,
            resetPasswordButtonDisabled: true,
        };
    }

    if (action.type === PASSWORD_RESET_EMAIL_SENT) {
        return { ...state, oldPassword: '', oldPasswordDisabled: false, resetPasswordButtonDisabled: false };
    }

    return state;
};
