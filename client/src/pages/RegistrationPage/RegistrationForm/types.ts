import { ChangeEvent } from 'react';
import { Agreement } from '../../../firebase/types';

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
    agreements: Agreement[];
    agreementMoreBtn: string;
    agreementContainer: string;
    agreementCheckboxHeader: string;
    agreementCheckboxWrapper: string;
    agreementText: string;
    agreementLink: string;
    agreementHeader: string;
    agreementModal: string;
    agreementPanel: string;
    agreementCheckbox: string;
    checkboxContent: string;
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

export interface AgreementModalProps {
    open: boolean;
    agreementModal: string;
    toggleModal(): void;
    agreementHeader: string;
}
