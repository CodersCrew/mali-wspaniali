import { ChangeEvent } from 'react';
import { InputLabelProps, SelectProps } from '@material-ui/core';

export type GeneralRecipient = '' | 'PARENTS' | 'KINDERGARTENS';

export type SpecificRecipient = '' | 'ALL' | 'KINDERGARTEN' | 'SINGLE';

export type NewsletterState = {
    type: {
        value: string;
        error: boolean;
    };
    topic: {
        value: string;
        error: boolean;
    };
    generalType: {
        value: GeneralRecipient;
        error: boolean;
    };
    specificType: {
        value: SpecificRecipient;
        error: boolean;
    };
    recipients: {
        value: string[];
        error: boolean;
    };
    message: {
        value: string;
        error: false;
    };
};

export type Newsletter = {
    recipients: string[];
    type: string;
    topic: string;
    message: string;
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
    setFields: React.Dispatch<React.SetStateAction<NewsletterState>>;
};

export type NewsletterRecipientProps = {
    generalType: {
        value: GeneralRecipient;
        error: boolean;
    };
    specificType: {
        value: SpecificRecipient;
        error: boolean;
    };
    recipients: MultipleFieldType;
    handleChange: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
};

export type NewsletterContentProps = {
    handleChange: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
    type: SingleFieldType;
    topic: SingleFieldType;
    message: SingleFieldType;
    setFields: React.Dispatch<React.SetStateAction<NewsletterState>>;
};

export type RecipientTypeProps = {
    generalType: SingleFieldType;
    handleRecipientTypeChange: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
};

export type SelectOptionsValues = {
    value: string;
    label: string;
}[];

type CommonSelectProps = {
    optionsValues: SelectOptionsValues;
    handleChange: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
} & InputLabelProps &
    SelectProps;

export type SingleSelectProps = {
    stateData: SingleFieldType;
} & CommonSelectProps;

export type MultipleSelectProps = {
    stateData: MultipleFieldType;
} & CommonSelectProps;
