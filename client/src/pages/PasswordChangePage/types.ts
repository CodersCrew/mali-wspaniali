import { ChangeEvent } from 'react';

export type PassChangeForm = {
    password: string;
    passwordConfirm: string;
};

export type PasswordValidation = {
    length: boolean;
    capital: boolean;
    digit: boolean;
    special: boolean;
};

export type PasswordChangeProps = {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    password: string;
    passwordConfirm: string;
    error: boolean;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    loading?: boolean;
};
