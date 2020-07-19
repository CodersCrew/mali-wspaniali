export interface FormControlOldPasswordStatesInterface {
    states: {
        changePasswordButtonDisabled: boolean;
        confirmNewPassword: string;
        currentUserEmail: string;
        newPassword: string;
        newPasswordDisabled: boolean;
        oldPassword: string;
        oldPasswordError: boolean;
        oldPasswordHelperText: string;
        showOldPassword: boolean;
        validPasswordLength: boolean;
        validPasswordNumber: boolean;
        validPasswordSymbol: boolean;
        validPasswordUppercase: boolean;
    };
}

export interface FormControlOldPasswordPropsInterface extends FormControlOldPasswordStatesInterface {
    onChange: (states: FormControlOldPasswordStatesInterface) => void;
}
