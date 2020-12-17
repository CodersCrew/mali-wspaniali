import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { useCreateAssessment } from '../../operations/mutations/Assessment/createAssessment';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';
import { formatDate } from '../../utils/formatDate';
import { useAssessment } from '../../operations/queries/Assessment/getAssessment';
import { useUpdateAssessment } from '../../operations/queries/Assessment/updateAssessment';

const TWO_MONTHS = 60 * 24 * 60 * 60 * 1000;

const defaultStartDate = new Date();
const defaultEndDate = new Date(defaultStartDate.getTime() + TWO_MONTHS);

export interface SuccessState {
    assessment: AssessmentManagerState;
    message?: string
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
    kindergartenIds: string[];
}

const defaultAssessment: AssessmentManagerState = {
    title: '',
    startDate: formatDate(defaultStartDate),
    endDate: formatDate(defaultEndDate),
    isOutdated: false,
    isDeleted: false,
    kindergartenIds: []
};

export function useAssessmentManager(testId: string | undefined, onSubmit: (state: SuccessState | ErrorState) => void) {
    const [updatedLocalAssessment, setUpdateLocalAssessment] = useState(defaultAssessment)
    const [reasonForBeingDisabled, setReasonForBeingDisabled] = useState<string | undefined>(undefined);
    const { kindergartenList } = useKindergartens();
    const { t } = useTranslation();
    const { createAssessment: createTest, error } = useCreateAssessment();
    const state = updatedLocalAssessment;
    const { updateAssessment } = useUpdateAssessment(testId!);

    const { assessment } = useAssessment(testId!);

    useEffect(() => {
        if (!assessment) return;

        setUpdateLocalAssessment({
            title: assessment.title,
            startDate: assessment.startDate,
            endDate: assessment.endDate,
            isOutdated: assessment.isOutdated,
            isDeleted: assessment.isDeleted,
            kindergartenIds: assessment.kindergartens.map(k => k.kindergarten._id)
        })

    }, [assessment]);

    useEffect(() => {
        validate(state)
            .then(() => setReasonForBeingDisabled(undefined))
            .catch(e => {
                if (e.errors.length > 0) {
                    setReasonForBeingDisabled(e.errors[0]);
                }
            });
    }, [updatedLocalAssessment, state]);

    function submit(update: AssessmentManagerState) {
        if (testId) return updatedAssessment(update)

        createAssessment();
    }

    function updatedAssessment(update: AssessmentManagerState) {
        const valid = validate(update || updatedLocalAssessment); 

        const parsedKindergarten = getKindergartenUpdateInput()

        valid.then((result) => {

            if (result) {
                const { kindergartenIds , ...validAssessment} = result as AssessmentManagerState;
                const updatedAssessmentInput =  { ...validAssessment, kindergartens: parsedKindergarten };

                updateAssessment(updatedAssessmentInput)
                    .then(() => {
                        setReasonForBeingDisabled('add-test-view.errors.test-already-updated')
                        onSubmit({assessment: state, message: t('add-test-view.assessment-updated')})
                    })
                    .catch(e => onSubmit({ errors: e.message}))
            }
        });

    }

    function createAssessment() {
        const valid = validate(state); 

        valid
        .then(() => {
            createTest(updatedLocalAssessment).then(() => {
                if (!error) {
                    setReasonForBeingDisabled('add-test-view.errors.test-already-created');
                    onSubmit({ assessment: state, message: t('add-test-view.assessment-created')});
                }
            });
        })
        .catch(e => {
            onSubmit({ errors: t(e.message) });
        });
    }

    function getKindergartenUpdateInput() {
        const parsedKindergarten = assessment?.kindergartens.map(k => ({
            kindergartenId: k.kindergarten._id,
            instructorId: k.instructor?._id
        }))
        .filter(k => {
            return updatedLocalAssessment.kindergartenIds.includes(k.kindergartenId)
        }) 
        || []

        updatedLocalAssessment.kindergartenIds.forEach(s => {
            if (parsedKindergarten.find(k => k.kindergartenId === s)) {
                return;
            }

            parsedKindergarten.push({ kindergartenId: s, instructorId: undefined})
        })
        
        return parsedKindergarten
    }

    return {
        submit: (update?: Partial<AssessmentManagerState>) => {
            setUpdateLocalAssessment(prev => {
                if (update) {
                    submit({...prev, ...update});

                    return ({...prev, ...update})
                }

                submit({...prev, ...updatedLocalAssessment});

                return ({...prev, ...updatedLocalAssessment})
            })
        },
        kindergartens: kindergartenList.map(k => {
            return { selected: updatedLocalAssessment.kindergartenIds.includes(k._id), kindergarten: k };
        }),
        reasonForBeingDisabled,
        updateAssessment: (update: Partial<AssessmentManagerState>) => {
            setUpdateLocalAssessment(prev => {
                return ({...prev, ...update})
            })
        },
        assessemnt: updatedLocalAssessment
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
