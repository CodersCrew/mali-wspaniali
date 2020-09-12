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

// export type RecipientTypeProps = {
//     generalType: { value: string; error: boolean };
//     handleRecipientTypeChange: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
// };
