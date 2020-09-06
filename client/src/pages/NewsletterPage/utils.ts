import { Dispatch, SetStateAction } from 'react';
import { TFunction } from 'i18next';
import {
    GeneralRecipientInputValues,
    SpecificRecipientInputValues,
    SingleFieldType,
    MultipleFieldType,
    ProgressBarStates,
    CheckSelection,
    SelectOptionsValues,
} from './types';
import { Kindergarten } from '../../graphql/types';

export const areParentsSelected: CheckSelection = type => type.value === GeneralRecipientInputValues.parents;

export const areParentsFromKindergartenSelected: CheckSelection = type =>
    type.value === SpecificRecipientInputValues.kindergarten;

export const areSpecificRecipientsRequired: CheckSelection = type =>
    type.value === SpecificRecipientInputValues.single || type.value === SpecificRecipientInputValues.kindergarten;

export const setLabel = (
    generalType: SingleFieldType,
    specificType: SingleFieldType,
    recipients: MultipleFieldType,
): string => {
    const parentsSelected = generalType.value === GeneralRecipientInputValues.parents;
    const parentsFromKindergartenSelected = specificType.value === SpecificRecipientInputValues.kindergarten;

    if (parentsSelected && parentsFromKindergartenSelected) {
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
