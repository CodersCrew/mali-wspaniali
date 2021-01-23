import { useEffect, useState } from 'react';
import { useAssessments } from '../../operations/queries/Assessment/getAllAssessments';
import { Assessment, Kindergarten, Child, AssessmentResult } from '../../graphql/types';
import { useAssessmentResults } from '../../operations/queries/Results/getAssessmentResults';

interface Props {
    assessmentId: string;
    kindergartenId: string;
    childId: string;
    measurement: string;
}

export interface AssessmentValues {
    run: number;
    pendelumRun: number;
    jump: number;
    throw: number;
}

export interface ResultCreatorReturnProps {
    assessments: Assessment[];
    values: AssessmentValues;
    points: AssessmentValues;
    selectedAssessment: Assessment;
    selectedKindergarten: Kindergarten;
    selectedChild: Child;
    onChange: (value: AssessmentValues) => void;
    error: null;
    edited: string;
    kindergartenResults: AssessmentResult[];
    edit: (name: string) => void;
}

export interface ResultCreatorErrorReturnProps {
    error: string;
    selectedAssessment?: Assessment;
    selectedKindergarten?: Kindergarten;
    selectedChild?: Child;
}

export function useResultCreator({
    assessmentId,
    kindergartenId,
    childId,
    measurement,
}: Props): ResultCreatorReturnProps | ResultCreatorErrorReturnProps {
    const { assessments } = useAssessments({ withChildren: true });
    const { kindergartenResults } = useAssessmentResults(kindergartenId, assessmentId);
    const [values, setValues] = useState({
        run: 0,
        pendelumRun: 0,
        throw: 0,
        jump: 0,
    });
    const [edited, setEdited] = useState(() => localStorage.getItem('edited') || '');

    useEffect(() => {
        setValues(getResultValue());
    }, [assessmentId, kindergartenId, childId, measurement, kindergartenResults]);

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

    const { run, pendelumRun, jump, throw: throwBall } = selectedChild.currentParams!;

    let points = {
        run: 0,
        pendelumRun: 0,
        throw: 0,
        jump: 0,
    };

    if (run && pendelumRun && jump && throwBall) {
        points = {
            run: countPoints(values.run, run.a, run.b, run.lowerLimitPoints, run.upperLimitPoints),
            pendelumRun: countPoints(
                values.pendelumRun,
                pendelumRun.a,
                pendelumRun.b,
                pendelumRun.lowerLimitPoints,
                pendelumRun.upperLimitPoints,
            ),
            throw: countInvertedPoints(
                values.throw,
                throwBall.a,
                throwBall.b,
                throwBall.lowerLimitPoints,
                throwBall.upperLimitPoints,
            ),
            jump: countInvertedPoints(values.jump, jump.a, jump.b, jump.lowerLimitPoints, jump.upperLimitPoints),
        };
    }

    return {
        assessments,
        values,
        points,
        selectedAssessment,
        selectedKindergarten,
        selectedChild,
        onChange: (value: any) => setValues(value),
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
            };
        }

        if (measurement === 'first') {
            return {
                run: childResult.firstMeasurementRunResult || 0,
                pendelumRun: childResult.firstMeasurementPendelumRunResult || 0,
                throw: childResult.firstMeasurementThrowResult || 0,
                jump: childResult.firstMeasurementJumpResult || 0,
            };
        }

        return {
            run: childResult.lastMeasurementRunResult || 0,
            pendelumRun: childResult.lastMeasurementPendelumRunResult || 0,
            throw: childResult.lastMeasurementThrowResult || 0,
            jump: childResult.lastMeasurementJumpResult || 0,
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
    const selectedKindergarten = selectedAssessment?.kindergartens.find((k) => k.kindergarten._id === kindergartenId)
        ?.kindergarten;
    const selectedChild = selectedKindergarten?.children?.find((c) => c._id === childId);

    return {
        selectedAssessment,
        selectedKindergarten,
        selectedChild,
    };
}

function countPoints(value: number, a: number, b: number, min: number, max: number) {
    if (value === 0) return 0;

    const points = a * value + b;

    if (points < max) return max;

    if (points > min) return min;

    return points;
}

function countInvertedPoints(value: number, a: number, b: number, min: number, max: number) {
    if (value === 0) return 0;

    const points = a * value + b;

    if (points > max) return max;

    if (points < min) return min;

    return points;
}
