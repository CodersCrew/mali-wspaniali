import { Me } from '../../graphql/types';

export interface FormValues {
    email: string;
    messageTopic: string;
    message: string;
}

export interface SettingsMessageModalProps {
    preventClose: boolean;
    isCancelButtonVisible: boolean;
    user: Me;
}
