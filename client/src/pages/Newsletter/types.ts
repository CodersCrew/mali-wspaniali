import { ChangeEvent } from 'react';
import { InputLabelProps, SelectProps } from '@material-ui/core';

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

export enum ProgressBarNames {
    firstStep = 'FIRSTSTEP',
    secondStep = 'SECONDSTEP',
}
export enum ProgressBarContent {
    one = '1',
    two = '2',
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

export type NewsletterRecipientProps = {
    generalType: SingleFieldType;
    specificType: SingleFieldType;
    recipients: MultipleFieldType;
    handleChange: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
};

export type NewsletterContentProps = {
    handleChange: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
    type: SingleFieldType;
    topic: SingleFieldType;
    specificType: SingleFieldType;
    recipients: MultipleFieldType;
    message: SingleFieldType;
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

export type ProgressBarProps = {
    progressBarState: { firstStep: ProgressBarStates; secondStep: ProgressBarStates };
};
