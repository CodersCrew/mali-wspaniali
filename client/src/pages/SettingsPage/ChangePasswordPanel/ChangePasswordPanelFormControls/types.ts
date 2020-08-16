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

export interface FormControlNewPasswordStatesInterface {
    states: {
        newPassword: string;
        newPasswordDisabled: boolean;
        showNewPassword: boolean;
        confirmNewPassword: string;
        confirmNewPasswordDisabled: boolean;
        validPasswordLength: boolean;
        validPasswordNumber: boolean;
        validPasswordSymbol: boolean;
        validPasswordUppercase: boolean;
        changePasswordButtonDisabled: boolean;
    };
}

export interface FormControlConfirmNewPasswordStatesInterface {
    states: {
        changePasswordButtonDisabled: boolean;
        confirmNewPassword: string;
        confirmNewPasswordDisabled: boolean;
        newPassword: string;
        showConfirmNewPassword: boolean;
    };
}

export interface ValidationMarksStatesInterface {
    states: {
        newPasswordDisabled: boolean;
        validPasswordLength: boolean;
        validPasswordNumber: boolean;
        validPasswordSymbol: boolean;
        validPasswordUppercase: boolean;
    };
}

export interface FormControlOldPasswordPropsInterface extends FormControlOldPasswordStatesInterface {
    onChange: (states: FormControlOldPasswordStatesInterface) => void;
}

export interface FormControlNewPasswordPropsInterface extends FormControlNewPasswordStatesInterface {
    onChange: (states: FormControlNewPasswordStatesInterface) => void;
}

export interface FormControlConfirmNewPasswordPropsInterface extends FormControlConfirmNewPasswordStatesInterface {
    onChange: (states: FormControlConfirmNewPasswordStatesInterface) => void;
}

export interface ValidationMarksPropsInterface extends ValidationMarksStatesInterface {
    onChange: (states: ValidationMarksStatesInterface) => void;
}
