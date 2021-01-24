import React from 'react';

import { AuthTemplate } from '../AuthTemplate/AuthTemplate';

import { RegistrationForm } from './RegistrationForm';

export default function RegistrationPage() {
    return (
        <AuthTemplate type="register">
            <RegistrationForm />
        </AuthTemplate>
    );
}
