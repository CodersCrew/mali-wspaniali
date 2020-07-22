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
    // Are all the required fields of the first step filled in
    const isFirstStepDone = recipients.value.length > 0 || specificType.value === SpecificRecipientInputValues.all;

    // Are there some missing values in step one while some values provided to step two
    const isFirstStepError =
        recipients.value.length === 0 &&
        specificType.value !== SpecificRecipientInputValues.all &&
        !!(type.value || topic.value || message.value);

    // Is there no type provided but topic or message has a value or is there no type or topic provided but message has a value
    const isSecondStepError = (!type && (topic || message.value)) || !!((!type.value || !topic.value) && message.value);

    // Are there no recipients selected and no fields in the second step filled in
    const isFirstStepReady =
        recipients.value.length === 0 && !type.value && !topic.value && message.value === '<p><br></p>';

    // Are recipients selected and all the required fields of the second step filled in
    const areStepsDone = !!(
        recipients.value.length > 0 &&
        type.value &&
        topic.value &&
        message.value &&
        message.value !== '<p><br></p>'
    );

    const { Done, Ready, Error, Inactive } = ProgressBarStates;

    if (isFirstStepDone) {
        setState({ firstStep: Done, secondStep: Ready });
    }
    if (isFirstStepError) {
        setState(prevState => ({ ...prevState, firstStep: Error }));
    }
    if (isSecondStepError) {
        setState(prevState => ({
            ...prevState,
            secondStep: Error,
        }));
    }
    if (isFirstStepReady) {
        setState({ firstStep: Ready, secondStep: Inactive });
    }
    if (areStepsDone) {
        setState({ firstStep: Done, secondStep: Done });
    }
};
