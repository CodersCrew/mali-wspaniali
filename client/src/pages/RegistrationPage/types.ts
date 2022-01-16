import { Agreement } from '@app/graphql/types';

export type RegistrationUser = {
    email: string;
    password: string;
};

export type RegistrationState = {
    user: RegistrationUser;
};

export interface AgreementExtended extends Agreement {
    agreementId: string;
    extraContent?: string;
    isRequired?: boolean;
    isChecked?: boolean;
    type?: string;
}
