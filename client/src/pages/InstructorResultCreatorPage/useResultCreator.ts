import { useAssessments } from '../../operations/queries/Assessment/getAllAssessments';
import { Assessment, Kindergarten, Child, AssessmentResult } from '../../graphql/types';
import { useAssessmentResults } from '../../operations/queries/Results/getAssessmentResults';

interface Props {
    assessmentId: string;
    kindergartenId: string;
    childId: string;
    groupId: string;
    measurement: string;
}
export interface AssessmentValues {
    run: number;
    pendelumRun: number;
    jump: number;
    throw: number;
    note: string;
}

export interface ResultCreatorReturnProps {
    assessments: Assessment[];
    values: AssessmentValues;
    selectedAssessment: Assessment;
    selectedKindergarten: Kindergarten;
    selectedChild: Child;
    selectedGroup: string;
    error: null;
    edited: string;
    kindergartenResults: AssessmentResult[];
    edit: (name: string) => void;
}

export interface ResultCreatorErrorReturnProps {
    error: string;
    selectedAssessment?: Assessment;
    selectedKindergarten?: Kindergarten | null;
    selectedChild?: Child;
    selectedGroup?: string;
}

export function useResultCreator({
    assessmentId,
    kindergartenId,
    childId,
    groupId,
    measurement,
}: Props): ResultCreatorReturnProps | ResultCreatorErrorReturnProps {
    const { assessments } = useAssessments({ withChildren: true });
    const { kindergartenResults } = useAssessmentResults(kindergartenId, assessmentId);
    const [edited, setEdited] = React.useState(() => localStorage.getItem('edited') || '');

    const { selectedAssessment, selectedKindergarten, selectedChild } = getSelected({
        assessments,
        assessmentId,
        kindergartenId,
        childId,
    });

    if (!selectedAssessment || !selectedKindergarten || !selectedChild) {
        return {
            error: 'Could not find child',
            selectedAssessment,
            selectedKindergarten,
            selectedChild,
        };
    }

    return {
        assessments,
        values: getResultValue(),
        selectedAssessment,
        selectedKindergarten,
        selectedChild,
        selectedGroup: groupId,
        error: null,
        edited,
        kindergartenResults,
        edit: (name: string) => {
            setEdited(name);
            localStorage.setItem('edited', name);
        },
    };

    function getResultValue() {
        const childResult = kindergartenResults.find((r) => r.childId === childId);

        if (!childResult) {
            return {
                run: 0,
                pendelumRun: 0,
                throw: 0,
                jump: 0,
                note: '',
            };
        }

        if (measurement === 'first') {
            return {
                run: childResult.firstMeasurementRunResult || 0,
                pendelumRun: childResult.firstMeasurementPendelumRunResult || 0,
                throw: childResult.firstMeasurementThrowResult || 0,
                jump: childResult.firstMeasurementJumpResult || 0,
                note: childResult.firstMeasurementNote || '',
            };
        }

        return {
            run: childResult.lastMeasurementRunResult || 0,
            pendelumRun: childResult.lastMeasurementPendelumRunResult || 0,
            throw: childResult.lastMeasurementThrowResult || 0,
            jump: childResult.lastMeasurementJumpResult || 0,
            note: childResult.lastMeasurementNote || '',
        };
    }
}

function getSelected({
    assessments,
    assessmentId,
    kindergartenId,
    childId,
}: {
    assessments: Assessment[];
    assessmentId: string;
    kindergartenId: string;
    childId: string;
}) {
    const selectedAssessment = assessments.find((a) => a._id === assessmentId);
    const selectedKindergarten = selectedAssessment?.kindergartens.find(
        (k) => k.kindergarten?._id === kindergartenId,
    )?.kindergarten;
    const selectedChild = selectedKindergarten?.children?.find((c) => c._id === childId);

    return {
        selectedAssessment,
        selectedKindergarten,
        selectedChild,
    };
}
