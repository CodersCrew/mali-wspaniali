import { GeneralRecipientInputValues, SpecificRecipientInputValues } from './types';

export const recipientType = [
    {
        value: GeneralRecipientInputValues.parents,
        label: 'newsletter.parents',
    },
    {
        value: GeneralRecipientInputValues.kindergartens,
        label: 'newsletter.kindergartens',
    },
];

export const parentsRecipients = [
    {
        value: SpecificRecipientInputValues.all,
        label: 'newsletter.specific-recipient-value-labels.all-parents',
    },
    {
        value: SpecificRecipientInputValues.kindergarten,
        label: 'newsletter.specific-recipient-value-labels.from-single-kindergarten',
    },
    {
        value: SpecificRecipientInputValues.single,
        label: 'newsletter.specific-recipient-value-labels.individual-message',
    },
];

export const kindergartensRecipients = [
    {
        value: SpecificRecipientInputValues.all,
        label: 'newsletter.specific-recipient-value-labels.all-kindergartens',
    },
    {
        value: SpecificRecipientInputValues.single,
        label: 'newsletter.specific-recipient-value-labels.single-kindergarten',
    },
];

export const newsletterTypes = [
    { value: 'results', label: 'newsletter.newsletter-types.results' },
    { value: 'agreements', label: 'newsletter.newsletter-types.agreements' },
    { value: 'events', label: 'newsletter.newsletter-types.events' },
    { value: 'important', label: 'newsletter.newsletter-types.important' },
    { value: 'other', label: 'newsletter.newsletter-types.other' },
];
