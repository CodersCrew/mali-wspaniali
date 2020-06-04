import { ChangeEvent } from 'react';
import { AdminAgreement } from '../../../firebase/types';

export type RegisterForm = {
    email: string;
    password: string;
    passwordConfirm: string;
};

export interface RegistrationEmailProps {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleNext(): void;
    email: string;
    form: RegisterForm;
    classForm: string;
    classButton: string;
    classNextBtn: string;
}

export interface RegistrationAgreementProps {
    handleBack(): void;
    handleNext(): void;
    activeStep: number;
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
