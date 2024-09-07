import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { activePage } from '@app/apollo_client';
import { PageContainer } from '@app/components/PageContainer';
import { openSnackbar } from '@app/components/Snackbar/openSnackbar';

import { useIsDevice } from '@app/queries/useBreakpoints';
import {
    useUpdateAssessmentResult,
    UpdatedAssessmentInput,
} from '@app/operations/mutations/Results/updateAssessmentResult';
import {
    CreatedAssessmentInput,
    useCreateAssessmentResult,
} from '@app/operations/mutations/Results/createAssessmentResult';
import {
    ResultCreatorErrorReturnProps,
    ResultCreatorReturnProps,
    useResultCreator,
    AssessmentValues,
} from './useResultCreator';
import { ResultCreator as DesktopResultCreator } from './ResultCreator';
import { MobileResultCreator } from './MobileResultCreator';

interface PageParams {
    assessmentId: string;
    kindergartenId: string;
    childId: string;
    groupId: string;
    measurement: string;
}
interface HistoryResultCreatorParams {
    sourcePageInfo: {
        actualPath: string;
        backBtnName: string;
    };
}

export default function InstructorResultCreatorPage() {
    const { assessmentId, kindergartenId, childId, groupId, measurement } = useParams<PageParams>();
    const { createAssessmentResult, isCreationPending } = useCreateAssessmentResult();
    const { updateAssessmentResult, isUpdateending: isUpdatePending } = useUpdateAssessmentResult();

    const history = useHistory<HistoryResultCreatorParams | undefined>();

    const device = useIsDevice();
    const { t } = useTranslation();

    useEffect(() => {
        activePage(['instructor-menu.result-creator']);
    }, []);

    const resultCreator = useResultCreator({
        assessmentId,
        kindergartenId,
        childId,
        measurement,
        groupId,
    });

    if (isResultCreatorErrorReturnProps(resultCreator)) {
        return null;
    }

    const ResultCreator = device.isSmallMobile ? MobileResultCreator : DesktopResultCreator;

    return (
        <PageContainer>
            <ResultCreator
                resultCreator={resultCreator}
                measurement={measurement}
                onClick={handleClick}
                isLoading={isCreationPending || isUpdatePending}
            />
        </PageContainer>
    );

    function pushHistory(destinationPath: string) {
        history.push(`/instructor/result/add/${destinationPath}`, history.location.state);
    }

    function handleClick(type: string, value: string | AssessmentValues) {
        if (isResultCreatorErrorReturnProps(resultCreator)) {
            return;
        }

        if (type === 'child') {
            pushHistory(
                `${measurement}/${resultCreator.selectedAssessment._id}/${resultCreator.selectedKindergarten?._id}/${resultCreator.selectedGroup}/${value}`,
            );
        }

        if (type === 'measurement') {
            pushHistory(`${value}/${assessmentId}/${kindergartenId}/${resultCreator.selectedGroup}/${childId}`);
        }

        if (type === 'kindergarten') {
            const currentSelectedKindergarten = resultCreator.selectedAssessment?.kindergartens.find(
                (k) => k.kindergarten?._id === value,
            )?.kindergarten;
            const firstChildren = currentSelectedKindergarten?.children![0];

            if (firstChildren) {
                pushHistory(`${measurement}/${resultCreator.selectedAssessment._id}/${value}/all/${firstChildren._id}`);
            }
        }

        if (type === 'group') {
            pushHistory(`${measurement}/${assessmentId}/${kindergartenId}/${value}/${childId}`);
        }

        if (type === 'back-to-table') {
            redirectToResultTable();
        }

        if (type === 'save-and-next') {
            createOrUpdateResult(
                { childId, assessmentId, kindergartenId, ...mapValuesToResult(value as AssessmentValues) },
                resultCreator,
            );

            onSaveSnackbar(resultCreator);

            redirectToNextChild();
        }

        if (type === 'save-and-back-to-table') {
            createOrUpdateResult(
                { childId, assessmentId, kindergartenId, ...mapValuesToResult(value as AssessmentValues) },
                resultCreator,
            );

            onSaveSnackbar(resultCreator);

            redirectToResultTable();
        }
    }

    function onSaveSnackbar(results: ResultCreatorReturnProps) {
        const { edited, selectedChild } = results;

        openSnackbar({
            text: `${t('add-result-page.result-saved-snackbar-1')}${t(`add-result-page.${edited}`)}${t(
                'add-result-page.result-saved-snackbar-2',
            )}${selectedChild.firstname} ${selectedChild?.lastname}`,
        });
    }

    function mapValuesToResult(results: AssessmentValues): Partial<CreatedAssessmentInput> {
        const result: Record<string, string | number> = {};

        const measurementName = getEditedMeasurement();

        const measurementResult = `${measurement}Measurement${normalizeEditedMeasurementName(measurementName)}Result`;
        const measurementDate = `${measurement}Measurement${normalizeEditedMeasurementName(measurementName)}Date`;

        result[measurementResult] = results[measurementName];
        result[measurementDate] = new Date().toISOString();

        if (results.note) {
            result[`${measurement}MeasurementNote`] = results.note;
        }

        return result;
    }

    function getEditedMeasurement() {
        return (resultCreator as ResultCreatorReturnProps).edited as keyof AssessmentValues;
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
        const sourcePage = history.location.state?.sourcePageInfo.actualPath ?? '/instructor';
        const actualState = history.location.state;
        history.push({
            pathname: sourcePage,
            state: actualState && {
                ...actualState,
                sourcePageInfo: { ...actualState.sourcePageInfo, actualPath: history.location.pathname },
            },
        });
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
            pushHistory(
                `${measurement}/${resultCreator.selectedAssessment._id}/${resultCreator.selectedKindergarten._id}/${resultCreator.selectedGroup}/${foundNextChild._id}`,
            );
        }
    }
}

function isResultCreatorErrorReturnProps(
    value: ResultCreatorReturnProps | ResultCreatorErrorReturnProps,
): value is ResultCreatorErrorReturnProps {
    return !!value.error;
}

function normalizeEditedMeasurementName(value: string) {
    return value[0].toUpperCase() + value.substr(1);
}
