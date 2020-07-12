import { ChangeEvent } from 'react';
import { InputLabelProps, SelectProps } from '@material-ui/core';
import { Kindergarten } from '../../firebase/types';
// import { Parent } from '../ParentProfile/types';

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

export type MultipleFieldType = {
    value: string[];
    error: boolean;
};

export type FieldsType = {
    type: SingleFieldType;
    topic: SingleFieldType;
    generalType: SingleFieldType;
    specificType: SingleFieldType;
    recipients: MultipleFieldType;
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
    handleRecipientTypeChange: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
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
    handleChange: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
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
    handleChange: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
    selectRecipients: (filteredRecipients: string[]) => void;
    setFields: React.Dispatch<React.SetStateAction<FieldsType>>;
};

export type RecipientTypeProps = {
    generalType: SingleFieldType;
    handleRecipientTypeChange: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
};

export type OptionsValues = {
    value: string;
    label: string;
}[];

export type SingleSelectProps = {
    stateData: SingleFieldType;
    optionsValues: OptionsValues;
    handleChange: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
} & InputLabelProps &
    SelectProps;

export type MultipleSelectProps = {
    stateData: MultipleFieldType;
    optionsValues: OptionsValues;
    handleChange: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
} & InputLabelProps &
    SelectProps;
