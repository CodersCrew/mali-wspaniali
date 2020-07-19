import { ChangeEvent } from 'react';

export interface PresentPasswordPageProps {
    handleInputChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    handleCreateNewPassword: () => void;
    subtitle: string;
    subtitleThin: string;
    textField: string;
    buttonWrapper: string;
    button: string;
    underlinedText: string;
    email: string;
}

export interface PostsentPasswordPageProps {
    subtitle: string;
    loginLink: string;
    loginLinkWrapper: string;
}
