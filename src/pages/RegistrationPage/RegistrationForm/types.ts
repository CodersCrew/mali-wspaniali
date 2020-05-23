import { ChangeEvent } from 'react';

export type RegisterForm = {
    email: string;
    password: string;
    passwordConfirm: string;
};

export interface RegistrationEmailProps {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleBack(): void;
    handleNext(): void;
    activeStep: number;
    email: string;
    form: RegisterForm;
    classForm: string;
    classButton: string;
    classNextBtn: string;
    classPrevBtn: string;
}

export interface RegistrationAgreementProps {
    handleBack(): void;
    handleNext(): void;
    activeStep: number;
    classButton: string;
    classNextBtn: string;
    classPrevBtn: string;
}

export type RegistrationPasswordProps = {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleBack(): void;
    handleNext(): void;
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
