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
                    <MobileResultCreator value={resultCreator} measurement={measurement} onClick={handleClick} />
                ) : (
                    <ResultCreator value={resultCreator} measurement={measurement} onClick={handleClick} />
                )}
            </PageContainer>
        </>
    );

    function handleClick(type: string, value: string) {
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
            history.push('/instructor');
        }

        if (type === 'save-and-next') {
            const currentChildIndex =
                resultCreator.selectedKindergarten.children?.findIndex(
                    (c) => c._id === resultCreator.selectedChild._id,
                ) || 0;

            const foundNextChild = resultCreator.selectedKindergarten.children![currentChildIndex + 1];

            createAssessmentResult({ childId, assessmentId, kindergartenId, ...mapValuesToResult(resultCreator) });

            if (foundNextChild) {
                history.push(
                    `/instructor/result/add/${measurement}/${resultCreator.selectedAssessment._id}/${resultCreator.selectedKindergarten._id}/${foundNextChild._id}`,
                );
            }
        }
    }

    function mapValuesToResult(results: ResultCreatorReturnProps): Partial<CreatedAssessmentInput> {
        const result: Partial<CreatedAssessmentInput> = {};

        (result as any)[
            `${measurement}Measurement${results.edited[0].toUpperCase()}${results.edited.substr(1)}Result`
        ] = results.values[results.edited as keyof Partial<AssessmentValues>];

        (result as any)[
            `${measurement}Measurement${results.edited[0].toUpperCase()}${results.edited.substr(1)}Date`
        ] = new Date();

        return result;
    }
}

function isResultCreatorErrorReturnProps(
    value: ResultCreatorReturnProps | ResultCreatorErrorReturnProps,
): value is ResultCreatorErrorReturnProps {
    return !!value.error;
}
