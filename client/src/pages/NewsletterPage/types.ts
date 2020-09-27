export type GeneralRecipient = 'PARENTS' | 'KINDERGARTENS';
export type SpecificRecipient = 'ALL' | 'KINDERGARTEN' | 'SINGLE';
export type NewsletterType = 'results' | 'agreements' | 'events' | 'important' | 'other';

export interface NewsletterFormValues {
    generalRecipientType: GeneralRecipient | '';
    specificRecipientType: SpecificRecipient | '';
    recipients: string[];
    type: NewsletterType | '';
    topic: string;
    message: string;
}
