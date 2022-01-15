import { RoleBasedKeyCodeObject } from './RoleBasedKeyCode.valueobject';

export type RegisterForm = {
    code: string;
    email: string;
    password: string;
    passwordConfirm: string;
};

export type PasswordValidation = {
    length: boolean;
    capital: boolean;
    digit: boolean;
    special: boolean;
};

export interface RegistrationCodeProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleNext(): void;
    code: string;
    classForm: string;
    classButton: string;
    classNextBtn: string;
    error: boolean;
    roleBasedKeyCode?: RoleBasedKeyCodeObject;
}

export interface RegistrationEmailProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleNext(): void;
    handleBack(): void;
    email: string;
    form: RegisterForm;
    classForm: string;
    classButton: string;
    classNextBtn: string;
    error: boolean;
}

export type RegistrationPasswordProps = {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleBack(): void;
    activeStep: number;
    password: string;
    passwordConfirm: string;
    classForm: string;
    classButton: string;
    classNextBtn: string;
    classFormItem: string;
    skip?: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    error: boolean;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
};

export type RegistrationFeedbackProps = {
    classLink: string;
    classHeader: string;
    classWrapper: string;
};

export interface AgreementModalProps {
    open: boolean;
    agreementModal: string;
    toggleModal(): void;
    agreementHeader: string;
}
