import { ChangeEvent } from 'react';
import { AdminAgreement } from '../../../firebase/types';

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
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleNext(): void;
    code: string;
    classForm: string;
    classButton: string;
    classPrevBtn: string;
    classNextBtn: string;
}

export interface RegistrationEmailProps {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleNext(): void;
    handleBack(): void;
    email: string;
    form: RegisterForm;
    classForm: string;
    classButton: string;
    classPrevBtn: string;
    classNextBtn: string;
}

export interface RegistrationAgreementProps {
    handleBack(): void;
    handleNext(): void;
    classButton: string;
    classNextBtn: string;
    classPrevBtn: string;
    agreements: AdminAgreement[];
}

export type RegistrationPasswordProps = {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleBack(): void;
    activeStep: number;
    password: string;
    passwordConfirm: string;
    classForm: string;
    classButton: string;
    classNextBtn: string;
    classPrevBtn: string;
    classFormItem: string;
};

export type RegistrationFeedbackProps = {
    classLink: string;
    classHeader: string;
    classWrapper: string;
};
