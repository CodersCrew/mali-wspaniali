import { Dispatch, SetStateAction } from 'react';
import {
    GeneralRecipientInputValues,
    SpecificRecipientInputValues,
    SingleFieldType,
    MultipleFieldType,
    ProgressBarStates,
} from './types';

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

export const setProgress = (
    specificType: SingleFieldType,
    recipients: MultipleFieldType,
    type: SingleFieldType,
    topic: SingleFieldType,
    message: SingleFieldType,
    setState: Dispatch<
        SetStateAction<{
            firstStep: ProgressBarStates;
            secondStep: ProgressBarStates;
        }>
    >,
) => {
    if (recipients.value.length > 0 || specificType.value === SpecificRecipientInputValues.all) {
        setState({ firstStep: ProgressBarStates.Done, secondStep: ProgressBarStates.Ready });
    }
    if (
        recipients.value.length === 0 &&
        specificType.value !== SpecificRecipientInputValues.all &&
        (type.value || topic.value || message.value)
    ) {
        setState(prevState => ({ ...prevState, firstStep: ProgressBarStates.Error }));
    }
    if ((!type && (topic || message.value)) || ((!type.value || !topic.value) && message.value)) {
        setState(prevState => ({
            ...prevState,
            secondStep: ProgressBarStates.Error,
        }));
    }
    if (recipients.value.length === 0 && !type.value && !topic.value && message.value === '<p><br></p>') {
        setState({ firstStep: ProgressBarStates.Ready, secondStep: ProgressBarStates.Inactive });
    }
    if (recipients.value.length > 0 && type.value && topic.value && message.value && message.value !== '<p><br></p>') {
        setState({ firstStep: ProgressBarStates.Done, secondStep: ProgressBarStates.Done });
    }
};
