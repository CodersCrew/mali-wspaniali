import { GeneralRecipient, SpecificRecipient, NewsletterState, MultipleFormValue } from './types';
import { Kindergarten } from '../../graphql/types';

export const setLabel = (
    generalType: GeneralRecipient,
    specificType: SpecificRecipient,
    recipients: MultipleFormValue,
): string => {
    if (generalType === 'PARENTS' && specificType === 'KINDERGARTEN') {
        if (recipients.value.length) {
            return 'newsletter.recipient-select-kindergarten-label-filled';
        }

        return 'newsletter.recipient-select-kindergarten-label';
    }

    if (recipients.value.length) {
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

export const areSpecificRecipientsRequired = (value: SpecificRecipient) =>
    value === 'KINDERGARTEN' || value === 'SINGLE';

export const isSubmitButtonDisabled = (data: NewsletterState) => {
    const { generalType, specificType, type, topic, message, recipients } = data;

    if (areSpecificRecipientsRequired(specificType.value)) {
        return (
            recipients.value.length === 0 ||
            !type.value ||
            !topic.value ||
            !message.value ||
            message.value === '<p><br></p>'
        );
    }

    return (
        !generalType.value || !specificType.value || !topic.value || !message.value || message.value === '<p><br></p>'
    );
};

export const isFirstStepCompleted = (
    generalRecipient: GeneralRecipient,
    specificRecipient: SpecificRecipient,
    recipients: string[],
) => {
    return areSpecificRecipientsRequired(specificRecipient)
        ? !!(generalRecipient && specificRecipient && recipients.length > 0)
        : !!(generalRecipient && specificRecipient);
};

export const isFirstStepError = (data: NewsletterState) => {
    const { generalType, specificType, type, topic, message, recipients } = data;

    if (areSpecificRecipientsRequired(specificType.value)) {
        return (
            !!(type.value || topic.value || message.value) &&
            (!generalType.value || !specificType.value || !recipients.value.length)
        );
    }

    return !!(type.value || topic.value || message.value) && (!generalType.value || !specificType.value);
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
