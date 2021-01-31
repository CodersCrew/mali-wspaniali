import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { activePage } from '../../apollo_client';
import { PageContainer } from '../../components/PageContainer';
import {
    ResultCreatorErrorReturnProps,
    ResultCreatorReturnProps,
    useResultCreator,
    AssessmentValues,
} from './useResultCreator';
import { ResultCreator } from './ResultCreator';
import { useIsDevice } from '../../queries/useBreakpoints';
import { MobileResultCreator } from './MobileResultCreator';
import {
    useUpdateAssessmentResult,
    UpdatedAssessmentInput,
} from '../../operations/mutations/Results/updateAssessmentResult';
import {
    CreatedAssessmentInput,
    useCreateAssessmentResult,
} from '../../operations/mutations/Results/createAssessmentResult';

interface PageParams {
    assessmentId: string;
    kindergartenId: string;
    childId: string;
    measurement: string;
}

export default function InstructorResultCreatorPage() {
    const { assessmentId, kindergartenId, childId, measurement } = useParams<PageParams>();
    const { createAssessmentResult } = useCreateAssessmentResult();
    const { updateAssessmentResult } = useUpdateAssessmentResult();

    const history = useHistory();
    const device = useIsDevice();

    useEffect(() => {
        activePage(['instructor-menu.add-results']);
    }, []);

    const resultCreator = useResultCreator({
        assessmentId,
        kindergartenId,
        childId,
        measurement,
    });

    if (isResultCreatorErrorReturnProps(resultCreator)) {
        return null;
    }

    return (
        <>
            <PageContainer>
                {device.isSmallMobile ? (
                    <MobileResultCreator
                        resultCreator={resultCreator}
                        measurement={measurement}
                        onClick={handleClick}
                    />
                ) : (
                    <ResultCreator resultCreator={resultCreator} measurement={measurement} onClick={handleClick} />
                )}
            </PageContainer>
        </>
    );

    function handleClick(type: string, value: string | AssessmentValues) {
        if (isResultCreatorErrorReturnProps(resultCreator)) {
            return;
        }

        if (type === 'child') {
            history.push(
                `/instructor/result/add/${measurement}/${resultCreator.selectedAssessment._id}/${resultCreator.selectedKindergarten._id}/${value}`,
            );
        }

        if (type === 'measurement') {
            history.push(`/instructor/result/add/${value}/${assessmentId}/${kindergartenId}/${childId}`);
        }

        if (type === 'kindergarten') {
            const currentSelectedKindergarten = resultCreator.selectedAssessment?.kindergartens.find(
                (k) => k.kindergarten._id === value,
            )?.kindergarten;
            const firstChildren = currentSelectedKindergarten?.children![0];

            if (firstChildren) {
                history.push(
                    `/instructor/result/add/${measurement}/${resultCreator.selectedAssessment._id}/${value}/${firstChildren._id}`,
                );
            }
        }

        if (type === 'back-to-table') {
            redirectToResultTable();
        }

        if (type === 'save-and-next') {
            createOrUpdateResult(
                { childId, assessmentId, kindergartenId, ...mapValuesToResult(value as AssessmentValues) },
                resultCreator,
            );

            redirectToNextChild();
        }

        if (type === 'save-and-back-to-table') {
            createOrUpdateResult(
                { childId, assessmentId, kindergartenId, ...mapValuesToResult(value as AssessmentValues) },
                resultCreator,
            );

            redirectToResultTable();
        }
    }

    function mapValuesToResult(results: AssessmentValues): Partial<CreatedAssessmentInput> {
        const result: Partial<CreatedAssessmentInput> = {};

        const measurementName = (resultCreator as ResultCreatorReturnProps).edited;

        (result as any)[
            `${measurement}Measurement${measurementName[0].toUpperCase()}${measurementName.substr(1)}Result`
        ] = results[measurementName as keyof AssessmentValues];

        (result as any)[
            `${measurement}Measurement${measurementName[0].toUpperCase()}${measurementName.substr(1)}Date`
        ] = new Date().toISOString();

        return result;
    }

    function createOrUpdateResult(update: Partial<UpdatedAssessmentInput>, results: ResultCreatorReturnProps) {
        const childResult = results.kindergartenResults.find((r) => r.childId === update.childId);

        if (childResult) {
            updateAssessmentResult({ _id: childResult._id, ...update });
        } else {
            createAssessmentResult(update);
        }
    }

    function redirectToResultTable() {
        history.push('/instructor');
    }

    function redirectToNextChild() {
        if (!resultCreator.selectedKindergarten || !resultCreator.selectedChild || !resultCreator.selectedAssessment) {
            return;
        }

        const currentChildIndex =
            resultCreator.selectedKindergarten.children?.findIndex((c) => c._id === resultCreator.selectedChild!._id) ||
            0;

        const foundNextChild = resultCreator.selectedKindergarten.children![currentChildIndex + 1];

        if (foundNextChild) {
            history.push(
                `/instructor/result/add/${measurement}/${resultCreator.selectedAssessment._id}/${resultCreator.selectedKindergarten._id}/${foundNextChild._id}`,
            );
        }
    }
}

function isResultCreatorErrorReturnProps(
    value: ResultCreatorReturnProps | ResultCreatorErrorReturnProps,
): value is ResultCreatorErrorReturnProps {
    return !!value.error;
}
