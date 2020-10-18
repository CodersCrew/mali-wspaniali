import { Dispatch } from 'react';

export interface ChangePasswordPanelState {
    oldPassword: string;
    oldPasswordError: boolean;
    oldPasswordHelperText: string;
    showOldPassword: boolean;
}

export interface Props {
    state: ChangePasswordPanelState;
    dispatch: Dispatch<{ type: string; payload?: { [p: string]: string | boolean } | undefined }>;
}
