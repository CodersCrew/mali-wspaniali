import { PasswordValidation } from '../../../RegistrationPage/RegistrationForm/types';
import {
    passwordCapitalTest,
    passwordDigitTest,
    passwordLengthTest,
    passwordSpecialTest,
} from '../../../RegistrationPage/passwordStrengthTest';

export const validateNewPassword = (password: string): PasswordValidation => {
    return {
        length: passwordLengthTest(password),
        capital: passwordCapitalTest(password),
        digit: passwordDigitTest(password),
        special: passwordSpecialTest(password),
    };
};
