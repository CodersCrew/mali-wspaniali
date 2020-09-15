export type GeneralRecipient = '' | 'PARENTS' | 'KINDERGARTENS';

export type SpecificRecipient = '' | 'ALL' | 'KINDERGARTEN' | 'SINGLE';

export type SingleFormValue = {
    value: string;
    error: boolean;
};

export type MultipleFormValue = {
    value: string[];
    error: boolean;
};

export type NewsletterState = {
    type: SingleFormValue;
    topic: SingleFormValue;
    generalType: {
        value: GeneralRecipient;
        error: boolean;
    };
    specificType: {
        value: SpecificRecipient;
        error: boolean;
    };
    recipients: MultipleFormValue;
    message: SingleFormValue;
};
