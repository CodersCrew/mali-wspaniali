import { GeneralRecipient, SpecificRecipient } from './types';

export const recipientType: { value: GeneralRecipient; label: string }[] = [
    {
        value: 'PARENTS',
        label: 'newsletter.parents',
    },
    {
        value: 'KINDERGARTENS',
        label: 'newsletter.kindergartens',
    },
];

export const parentsRecipients: { value: SpecificRecipient; label: string }[] = [
    {
        value: 'ALL',
        label: 'newsletter.specific-recipient-value-labels.all-parents',
    },
    {
        value: 'KINDERGARTEN',
        label: 'newsletter.specific-recipient-value-labels.from-selected-kindergartens',
    },
];

export const kindergartensRecipients: { value: SpecificRecipient; label: string }[] = [
    {
        value: 'ALL',
        label: 'newsletter.specific-recipient-value-labels.all-kindergartens',
    },
    {
        value: 'SINGLE',
        label: 'newsletter.specific-recipient-value-labels.selected-kindergartens',
    },
];

export const newsletterTypes = [
    { value: 'results', label: 'newsletter.newsletter-types.results' },
    { value: 'agreements', label: 'newsletter.newsletter-types.agreements' },
    { value: 'events', label: 'newsletter.newsletter-types.events' },
    { value: 'important', label: 'newsletter.newsletter-types.important' },
    { value: 'other', label: 'newsletter.newsletter-types.other' },
];
