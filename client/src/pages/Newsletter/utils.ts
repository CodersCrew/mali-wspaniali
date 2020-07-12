import { GeneralRecipientInputValues, SpecificRecipientInputValues, SingleFieldType, MultipleFieldType } from './types';

type CheckSelectionFn = (type: SingleFieldType) => boolean;

export const areParentsSelected: CheckSelectionFn = type => type.value === GeneralRecipientInputValues.parents;

export const areParentsFromKindergartenSelected: CheckSelectionFn = type =>
    type.value === SpecificRecipientInputValues.kindergarten;

export const areSpecificRecipientsRequired: CheckSelectionFn = type =>
    type.value === SpecificRecipientInputValues.single || type.value === SpecificRecipientInputValues.kindergarten;

export const setLabel = (
    generalType: SingleFieldType,
    specificType: SingleFieldType,
    recipients: MultipleFieldType,
): string => {
    const parentsSelected = generalType.value === GeneralRecipientInputValues.parents;
    const parentsFromKindergartenSelected = specificType.value === SpecificRecipientInputValues.kindergarten;
    const singleRecipientSelected = specificType.value === SpecificRecipientInputValues.single;
    const { length } = recipients.value;

    if (parentsSelected && parentsFromKindergartenSelected) {
        if (length) {
            return 'newsletter.recipient-select-kindergarten-label-filled';
        }
        return 'newsletter.recipient-select-kindergarten-label';
    }

    if (parentsSelected && singleRecipientSelected) {
        if (length) {
            return 'newsletter.recipient-single-parent-label-filled';
        }
        return 'newsletter.recipient-single-parent-label';
    }

    if (length) {
        return 'newsletter.recipient-single-kindergarten-label-filled';
    }

    return 'newsletter.recipient-single-kindergarten-label';
};
