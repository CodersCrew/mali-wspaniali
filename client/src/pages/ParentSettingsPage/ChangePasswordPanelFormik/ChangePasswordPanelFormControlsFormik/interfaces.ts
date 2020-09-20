import React, { ChangeEvent, Dispatch } from 'react';
import { FetchResult, MutationFunctionOptions } from '@apollo/client';

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

export interface ValidateOldPassword {
    password: string;
    mail: string;
    authorizeUser: (
        options?: MutationFunctionOptions<any, Record<string, any>> | undefined,
    ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
    callbackValid: () => void;
    callbackInvalid: (error: any) => void;
}

export interface ChangePasswordPanelFormikProps {
    value: string;
    onChange: (event: ChangeEvent<any>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    show: boolean;
    toggle: () => void;
    error: boolean;
    helperText: string;
}
