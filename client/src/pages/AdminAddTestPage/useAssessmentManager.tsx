import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { MeasurementStage } from '@app/graphql/types';
import { CreatedAssessmentInput, useCreateAssessment } from '@app/operations/mutations/Assessment/createAssessment';
import { useKindergartens } from '@app/operations/queries/Kindergartens/getKindergartens';
import { formatDate } from '@app/utils/formatDate';
import { useAssessment } from '@app/operations/queries/Assessment/getAssessment';
import { useUpdateAssessment } from '@app/operations/mutations/Assessment/updateAssessment';
import { useAssessments } from '@app/operations/queries/Assessment/getAllAssessments';

const TWO_MONTHS = 60 * 24 * 60 * 60 * 1000;

const defaultStartDate = new Date();
const defaultEndDate = new Date(defaultStartDate.getTime() + TWO_MONTHS);

export interface SuccessState {
    assessment: AssessmentManagerState;
    message?: string;
}

export interface ErrorState {
    errors: string;
}

export interface AssessmentManagerState {
    title: string;
    isOutdated: boolean;
    isDeleted: boolean;
    firstMeasurementStatus: MeasurementStage;
    lastMeasurementStatus: MeasurementStage;
    firstMeasurementStartDate: string;
    firstMeasurementEndDate: string;
    lastMeasurementStartDate: string;
    lastMeasurementEndDate: string;
    kindergartenIds: string[];
    firstMeasurementResultCount: number;
    lastMeasurementResultCount: number;
    maxResultCount: number;
}

const defaultAssessment: AssessmentManagerState = {
    title: '',
    isOutdated: false,
    isDeleted: false,
    firstMeasurementStatus: 'active',
    lastMeasurementStatus: 'active',
    firstMeasurementStartDate: formatDate(defaultStartDate),
    firstMeasurementEndDate: formatDate(defaultEndDate),
    lastMeasurementStartDate: formatDate(defaultStartDate),
    lastMeasurementEndDate: formatDate(defaultEndDate),
    kindergartenIds: [],
    firstMeasurementResultCount: 0,
    lastMeasurementResultCount: 0,
    maxResultCount: 0,
};

export function useAssessmentManager(
    assessmentId: string | undefined,
    onSubmit: (state: SuccessState | ErrorState) => void,
) {
    const [updatedLocalAssessment, setUpdateLocalAssessment] = useState(defaultAssessment);
    const [reasonForBeingDisabled, setReasonForBeingDisabled] = useState<string | undefined>(undefined);
    const { kindergartenList } = useKindergartens();
    const { t } = useTranslation();
    const { assessments } = useAssessments();
    const { createAssessment: createTest, error, isCreationPending } = useCreateAssessment();
    const state = updatedLocalAssessment;
    const { updateAssessment, isUpdatePending } = useUpdateAssessment();

    const { assessment } = useAssessment(assessmentId);

    useEffect(() => {
        if (!assessment) return;

        setUpdateLocalAssessment({
            title: assessment.title,
            firstMeasurementStatus: assessment.firstMeasurementStatus,
            lastMeasurementStatus: assessment.lastMeasurementStatus,
            firstMeasurementStartDate: assessment.firstMeasurementStartDate,
            firstMeasurementEndDate: assessment.firstMeasurementEndDate,
            lastMeasurementStartDate: assessment.lastMeasurementStartDate,
            lastMeasurementEndDate: assessment.lastMeasurementEndDate,
            isOutdated: assessment.isOutdated,
            isDeleted: assessment.isDeleted,
            kindergartenIds: assessment.kindergartens.filter((k) => !!k.kindergarten).map((k) => k.kindergarten!._id),
            firstMeasurementResultCount: assessment.firstMeasurementResultCount,
            lastMeasurementResultCount: assessment.lastMeasurementResultCount,
            maxResultCount: assessment.maxResultCount,
        });
    }, [assessment]);

    useEffect(() => {
        validate(state)
            .then(() => {
                const assessmentWithUsedName = assessments.find((a) => a.title === state.title);

                if (assessmentWithUsedName && assessmentWithUsedName._id !== assessmentId) {
                    return setReasonForBeingDisabled(t('add-test-view.errors.test-already-exists'));
                }

                setReasonForBeingDisabled(undefined);
            })
            .catch((e) => {
                if (e.errors.length > 0) {
                    setReasonForBeingDisabled(e.errors[0]);
                }
            });
    }, [updatedLocalAssessment, state, assessments, t, assessmentId]);

    function submit(update: AssessmentManagerState) {
        if (assessmentId) return submitUpdatedAssessment(update);

        createAssessment();
    }

    function submitUpdatedAssessment(update: AssessmentManagerState) {
        const valid = validate(update || updatedLocalAssessment);

        const parsedKindergarten = getKindergartenUpdateInput();

        valid.then((result) => {
            if (result) {
                const { kindergartenIds, ...validAssessment } = result;
                const updatedAssessmentInput = { ...validAssessment, kindergartens: parsedKindergarten };

                if (!assessmentId) return;

                updateAssessment(assessmentId, updatedAssessmentInput)
                    .then(() => {
                        setReasonForBeingDisabled('add-test-view.errors.test-already-updated');
                        onSubmit({ assessment: state, message: t('add-test-view.assessment-updated') });
                    })
                    .catch((e) => onSubmit({ errors: e.message }));
            }
        });
    }

    function createAssessment() {
        const valid = validate(state);

        valid
            .then(() => {
                // eslint-disable-next-line no-void
                void createTest(mapToCreatedAssessment(updatedLocalAssessment)).then(() => {
                    if (!error) {
                        setReasonForBeingDisabled('add-test-view.errors.test-already-created');
                        onSubmit({ assessment: state, message: t('add-test-view.assessment-created') });
                    }
                });
            })
            .catch((e) => {
                onSubmit({ errors: t(e.message) });
            });
    }

    function mapToCreatedAssessment(assessmentState: AssessmentManagerState): CreatedAssessmentInput {
        return {
            title: assessmentState.title,
            firstMeasurementStartDate: assessmentState.firstMeasurementStartDate,
            firstMeasurementEndDate: assessmentState.firstMeasurementEndDate,
            lastMeasurementStartDate: assessmentState.lastMeasurementStartDate,
            lastMeasurementEndDate: assessmentState.lastMeasurementEndDate,
            firstMeasurementStatus: assessmentState.firstMeasurementStatus,
            lastMeasurementStatus: assessmentState.lastMeasurementStatus,
            kindergartenIds: assessmentState.kindergartenIds,
        };
    }

    function getKindergartenUpdateInput() {
        const parsedKindergarten =
            assessment?.kindergartens
                .map((k) => ({
                    kindergartenId: k.kindergarten!._id,
                    instructorId: k.instructor?._id,
                }))
                .filter((k) => {
                    return updatedLocalAssessment.kindergartenIds.includes(k.kindergartenId);
                }) || [];

        updatedLocalAssessment.kindergartenIds.forEach((s) => {
            if (parsedKindergarten.find((k) => k.kindergartenId === s)) {
                return;
            }

            parsedKindergarten.push({ kindergartenId: s, instructorId: undefined });
        });

        return parsedKindergarten;
    }

    return {
        submit: (update?: Partial<AssessmentManagerState>) => {
            setUpdateLocalAssessment((prev) => {
                if (update) {
                    const updated = { ...prev, ...update };

                    submit(updated);

                    return updated;
                }

                const submited = { ...prev, ...updatedLocalAssessment };

                submit(submited);

                return submited;
            });
        },
        kindergartens: kindergartenList.map((k) => {
            return { selected: updatedLocalAssessment.kindergartenIds.includes(k._id), kindergarten: k };
        }),
        reasonForBeingDisabled,
        updateAssessment: (update: Partial<AssessmentManagerState>) => {
            setUpdateLocalAssessment((prev) => {
                return { ...prev, ...update };
            });
        },
        assessment: updatedLocalAssessment,
        isLoading: isCreationPending || isUpdatePending,
    };
}

// eslint-disable-next-line @typescript-eslint/require-await
async function validate(state: AssessmentManagerState) {
    const newTestSchema = yup.object().shape({
        title: yup.string().min(5, 'add-test-view.errors.name-too-short'),
        kindergartenIds: yup.array(),
    });

    return newTestSchema.validateSync(state);
}
