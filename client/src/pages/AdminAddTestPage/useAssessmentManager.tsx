import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { CreatedAssessmentInput, useCreateAssessment } from '../../operations/mutations/Assessment/createAssessment';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';
import { formatDate } from '../../utils/formatDate';
import { useAssessment } from '../../operations/queries/Assessment/getAssessment';
import { useUpdateAssessment } from '../../operations/mutations/Assessment/updateAssessment';
import { useAssessments } from '../../operations/queries/Assessment/getAllAssessments';

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
    startDate: string;
    endDate: string;
    isOutdated: boolean;
    isDeleted: boolean;
    status: string;
    firstMeasurementStatus: string;
    lastMeasurementStatus: string;
    firstMeasurementStartDate: string;
    firstMeasurementEndDate: string;
    lastMeasurementStartDate: string;
    lastMeasurementEndDate: string;
    kindergartenIds: string[];
}

const defaultAssessment: AssessmentManagerState = {
    title: '',
    startDate: formatDate(defaultStartDate),
    endDate: formatDate(defaultEndDate),
    isOutdated: false,
    isDeleted: false,
    status: 'active',
    firstMeasurementStatus: 'active',
    lastMeasurementStatus: 'active',
    firstMeasurementStartDate: formatDate(defaultStartDate),
    firstMeasurementEndDate: formatDate(defaultEndDate),
    lastMeasurementStartDate: formatDate(defaultStartDate),
    lastMeasurementEndDate: formatDate(defaultEndDate),
    kindergartenIds: [],
};

export function useAssessmentManager(testId: string | undefined, onSubmit: (state: SuccessState | ErrorState) => void) {
    const [updatedLocalAssessment, setUpdateLocalAssessment] = useState(defaultAssessment);
    const [reasonForBeingDisabled, setReasonForBeingDisabled] = useState<string | undefined>(undefined);
    const { kindergartenList } = useKindergartens();
    const { t } = useTranslation();
    const { assessments } = useAssessments();
    const { createAssessment: createTest, error, isCreationPending } = useCreateAssessment();
    const state = updatedLocalAssessment;
    const { updateAssessment, isUpdatePending } = useUpdateAssessment(testId!);

    const { assessment } = useAssessment(testId!);

    useEffect(() => {
        if (!assessment) return;

        setUpdateLocalAssessment({
            title: assessment.title,
            startDate: assessment.startDate,
            endDate: assessment.endDate,
            status: assessment.status,
            firstMeasurementStatus: assessment.firstMeasurementStatus,
            lastMeasurementStatus: assessment.lastMeasurementStatus,
            firstMeasurementStartDate: assessment.firstMeasurementStartDate,
            firstMeasurementEndDate: assessment.firstMeasurementEndDate,
            lastMeasurementStartDate: assessment.lastMeasurementStartDate,
            lastMeasurementEndDate: assessment.lastMeasurementEndDate,
            isOutdated: assessment.isOutdated,
            isDeleted: assessment.isDeleted,
            kindergartenIds: assessment.kindergartens.map((k) => k.kindergarten._id),
        });
    }, [assessment]);

    useEffect(() => {
        validate(state)
            .then(() => {
                const assessmentWithUsedName = assessments.find((a) => a.title === state.title);

                if (assessmentWithUsedName && assessmentWithUsedName._id !== testId) {
                    return setReasonForBeingDisabled(t('add-test-view.errors.test-already-exists'));
                }

                setReasonForBeingDisabled(undefined);
            })
            .catch((e) => {
                if (e.errors.length > 0) {
                    setReasonForBeingDisabled(e.errors[0]);
                }
            });
    }, [updatedLocalAssessment, state, assessments, t, testId]);

    function submit(update: AssessmentManagerState) {
        if (testId) return updatedAssessment(update);

        createAssessment();
    }

    function updatedAssessment(update: AssessmentManagerState) {
        const valid = validate(update || updatedLocalAssessment);

        const parsedKindergarten = getKindergartenUpdateInput();

        valid.then((result) => {
            if (result) {
                const { kindergartenIds, ...validAssessment } = result as AssessmentManagerState;
                const updatedAssessmentInput = { ...validAssessment, kindergartens: parsedKindergarten };

                updateAssessment(updatedAssessmentInput)
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
                createTest(mapToCreatedAssessment(updatedLocalAssessment)).then(() => {
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
            startDate: assessmentState.startDate,
            endDate: assessmentState.endDate,
            firstMeasurementStartDate: assessmentState.firstMeasurementStartDate,
            firstMeasurementEndDate: assessmentState.firstMeasurementEndDate,
            lastMeasurementStartDate: assessmentState.lastMeasurementStartDate,
            lastMeasurementEndDate: assessmentState.lastMeasurementEndDate,
            kindergartenIds: assessmentState.kindergartenIds,
        };
    }

    function getKindergartenUpdateInput() {
        const parsedKindergarten =
            assessment?.kindergartens
                .map((k) => ({
                    kindergartenId: k.kindergarten._id,
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
        assessemnt: updatedLocalAssessment,
        isLoading: isCreationPending || isUpdatePending,
    };
}

async function validate(state: AssessmentManagerState) {
    const newTestSchema = yup.object().shape({
        title: yup.string().min(5, 'add-test-view.errors.name-too-short'),
        startDate: yup.string().required(),
        endDate: yup.string().required(),
    });

    return newTestSchema.validateSync(state);
}
