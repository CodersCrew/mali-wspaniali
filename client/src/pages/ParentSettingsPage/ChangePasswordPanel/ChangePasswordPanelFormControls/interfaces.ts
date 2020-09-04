import { Dispatch } from 'react';

export interface ChangePasswordPanelState {
    changePasswordButtonDisabled: boolean;
    confirmNewPassword: string;
    confirmNewPasswordDisabled: boolean;
    newPassword: string;
    newPasswordDisabled: boolean;
    oldPassword: string;
    oldPasswordError: boolean;
    oldPasswordHelperText: string;
    showOldPassword: boolean;
    showNewPassword: boolean;
    showConfirmNewPassword: boolean;
}

export interface Props {
    state: ChangePasswordPanelState;
    dispatch: Dispatch<{ type: string; payload?: { [p: string]: string | boolean } | undefined }>;
}
