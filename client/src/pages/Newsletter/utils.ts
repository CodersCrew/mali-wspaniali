import { GeneralRecipientInputValues, SpecificRecipientInputValues, SingleFieldType } from './types';

type CheckSelectionFn = (type: SingleFieldType) => boolean;

export const areParentsSelected: CheckSelectionFn = type => type.value === GeneralRecipientInputValues.parents;

export const areParentsFromKindergartenSelected: CheckSelectionFn = type =>
    type.value === SpecificRecipientInputValues.kindergarten;

export const areSpecificRecipientsRequired: CheckSelectionFn = type =>
    type.value === SpecificRecipientInputValues.single || type.value === SpecificRecipientInputValues.kindergarten;
