import { passwordStrengthTest } from '../RegistrationPage/passwordStrengthTest';
import { emailTest } from '../RegistrationPage/emailTest';

// TODO: remove this 'testtest'

export const validateLoginData = (email: string, password: string): boolean => {
    const correctEmail = emailTest(email);
    const correctPassword = password === 'testtest' || passwordStrengthTest(password);

    return correctEmail && correctPassword;
};
