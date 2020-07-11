import { ChangeEvent } from 'react';
import { Kindergarten } from '../../firebase/types';

export type Message = string;

export type Newsletter = {
    recipients: string[];
    type: string;
    topic: string;
    message: Message;
};

export type SingleFieldType = {
    value: string;
    error: boolean;
};

export type FieldsType = {
    type: SingleFieldType;
    topic: SingleFieldType;
    generalType: SingleFieldType;
    specificType: SingleFieldType;
    recipients: {
        value: string[];
        error: boolean;
    };
    message: SingleFieldType;
};

export type WorkspaceProps = {
    message: string;
    setFields: React.Dispatch<React.SetStateAction<FieldsType>>;
};

export enum ProgressBarStates {
    Inactive = 'INACTIVE',
    Ready = 'READY',
    Error = 'ERROR',
    Done = 'DONE',
    FileError = 'FILEERROR',
}

export enum GeneralRecipientInputValues {
    parents = 'PARENTS',
    kindergartens = 'KINDERGARTENS',
}

export enum SpecificRecipientInputValues {
    all = 'ALL',
    kindergarten = 'KINDERGARTEN',
    single = 'SINGLE',
}

// TODO: this probably won't be necessary
export type NewsletterGeneralTypeTextFieldProps = {
    classes: Record<
        'container' | 'textfield' | 'heading' | 'underlineFocus' | 'selectItem' | 'inputChipLabel' | 'asterisk',
        string
    >;
    generalType: SingleFieldType;
    handleDelete: (name: string) => void;
    handleRecipientTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// TODO: this probably won't be necessary

export type NewsletterOptionalTextFieldProps = {
    classes: Record<
        | 'container'
        | 'textfield'
        | 'heading'
        | 'underlineFocus'
        | 'selectItem'
        | 'inputChipLabel'
        | 'asterisk'
        | 'selectMenuItem'
        | 'selectMenuCheckbox'
        | 'selectMenuItemText',
        string
    >;
    generalType: SingleFieldType;
    specificType: SingleFieldType;
    recipients: {
        value: string[];
        error: boolean;
    };
    setFields: React.Dispatch<React.SetStateAction<FieldsType>>;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    selectRecipients: (filteredRecipients: string[]) => void;
    parents: string[];
    kindergartens: Kindergarten[];
};

// TODO: this probably won't be necessary

export type NewsletterRecipientProps = {
    generalType: SingleFieldType;
    specificType: SingleFieldType;
    recipients: {
        value: string[];
        error: boolean;
    };
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    selectRecipients: (filteredRecipients: string[]) => void;
    setFields: React.Dispatch<React.SetStateAction<FieldsType>>;
};

export type RecipientTypeProps = {
    generalType: SingleFieldType;
    handleRecipientTypeChange: (e: ChangeEvent<{ value: unknown }>) => void;
};
