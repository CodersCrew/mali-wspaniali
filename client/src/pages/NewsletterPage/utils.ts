import { FormikErrors } from 'formik';
import { GeneralRecipient, SpecificRecipient, NewsletterFormValues } from './types';
import { Kindergarten } from '../../graphql/types';

export const setLabel = (
    generalType: GeneralRecipient | '',
    specificType: SpecificRecipient | '',
    recipients: string[],
): string => {
    if (generalType === 'PARENTS' && specificType === 'KINDERGARTEN') {
        if (recipients.length) {
            return 'newsletter.recipient-select-kindergarten-label-filled';
        }

        return 'newsletter.recipient-select-kindergarten-label';
    }

    if (recipients.length) {
        return 'newsletter.recipient-single-kindergarten-label-filled';
    }

    return 'newsletter.recipient-single-kindergarten-label';
};

export const generateKindergardenOptions = (kindergardens: Kindergarten[]): { value: string; label: string }[] => {
    const values = kindergardens.map(kindergarden => {
        const { _id, number, name } = kindergarden;

        return {
            value: _id,
            label: `${number}, ${name}`,
        };
    });

    return values;
};

export const areSpecificRecipientsRequired = (value: SpecificRecipient | '') =>
    value === 'KINDERGARTEN' || value === 'SINGLE';

export const isSubmitButtonDisabled = (data: NewsletterFormValues) => {
    const { generalRecipientType, specificRecipientType, type, topic, message, recipients } = data;

    console.log(message);

    if (areSpecificRecipientsRequired(specificRecipientType)) {
        return recipients.length === 0 || !type || !topic;
    }

    return !generalRecipientType || !specificRecipientType || !topic;
};

export const isFirstStepCompleted = (
    generalRecipient: GeneralRecipient | '',
    specificRecipient: SpecificRecipient | '',
    recipients: string[],
) => {
    return areSpecificRecipientsRequired(specificRecipient)
        ? !!(generalRecipient && specificRecipient && recipients.length > 0)
        : !!(generalRecipient && specificRecipient);
};

export const isFirstStepError = (data: NewsletterFormValues) => {
    const { generalRecipientType, specificRecipientType, type, topic, message, recipients } = data;

    if (areSpecificRecipientsRequired(specificRecipientType)) {
        return !!(type || topic || message) && (!generalRecipientType || !specificRecipientType || !recipients.length);
    }

    return !!(type || topic || message) && (!generalRecipientType || !specificRecipientType);
};

export const isSecondStepError = (type: string, topic: string, message: string) =>
    !!(topic && !type) || !!(message && !topic) || !!(message && !type && !topic);

export const setSecondStepLabel = (firstStepCompleted: boolean, secondStepCompleted: boolean) => {
    if (!firstStepCompleted) {
        return 'newsletter.sidebar.newsletter-content';
    }
    if (secondStepCompleted) {
        return 'newsletter.sidebar.done';
    }

    return 'newsletter.sidebar.fill';
};

export const validate = (values: NewsletterFormValues) => {
    const errors: FormikErrors<NewsletterFormValues> = {};

    const { generalRecipientType, specificRecipientType, recipients, type, topic } = values;

    if (!generalRecipientType) {
        errors.generalRecipientType = 'newsletter.general-recipient-helper-text';
    }

    if (!specificRecipientType) {
        errors.specificRecipientType = 'newsletter.specific-recipient-helper-text';
    }

    if (areSpecificRecipientsRequired(specificRecipientType) && recipients.length === 0) {
        errors.recipients = 'newsletter.recipient-helper-text';
    }

    if (!type) {
        errors.type = 'newsletter.type-helper-text';
    }

    if (!topic) {
        errors.topic = 'newsletter.topic-helper-text';
    }

    // TODO:
    // validate message field
    return errors;
};
