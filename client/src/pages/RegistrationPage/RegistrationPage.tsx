import React from 'react';
import { RegistrationForm } from './RegistrationForm';
import { AuthTemplate } from '../AuthTemplate/AuthTemplate';

export const RegistrationPage = () => {
    return (
        <AuthTemplate type="register">
            <RegistrationForm />
        </AuthTemplate>
    );
};
