import { TFunction } from 'i18next';
import { MultipleFieldType, SelectOptionsValues, GeneralRecipient, SpecificRecipient } from './types';
import { Kindergarten } from '../../graphql/types';

export const setLabel = (
    generalType: GeneralRecipient,
    specificType: SpecificRecipient,
    recipients: MultipleFieldType,
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

export const generateKindergardenOptions = (kindergardens: Kindergarten[], t: TFunction): SelectOptionsValues => {
    const values = kindergardens.map(kindergarden => {
        const { _id, number, name } = kindergarden;

        return {
            value: _id,
            label: `${t('newsletter.kindergarten-number')} ${number}, ${name}`,
        };
    });

    return values;
};
