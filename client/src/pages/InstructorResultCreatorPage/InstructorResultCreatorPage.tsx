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
import { MeasurementEditorActionType } from '@app/pages/InstructorResultCreatorPage/InstructorResultCreatorPage.types';
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
    const { updateAssessmentResult, isUpdatePending } = useUpdateAssessmentResult();

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

        const convertValuesToNumber = (valuesToConvert: AssessmentValues) => {
            return Object.fromEntries(
                Object.entries(valuesToConvert).map(([key, val]) => (key === 'note' ? [key, val] : [key, Number(val)])),
            );
        };

        if (type === MeasurementEditorActionType.CHILD) {
            if (value !== resultCreator.selectedChild?._id) {
                resultCreator.add();
            }

            pushHistory(
                `${measurement}/${resultCreator.selectedAssessment._id}/${resultCreator.selectedKindergarten?._id}/${
                    resultCreator.selectedGroup
                }/${value as string}`,
            );
        }

        if (type === MeasurementEditorActionType.MEASUREMENT) {
            pushHistory(
                `${value as string}/${assessmentId}/${kindergartenId}/${resultCreator.selectedGroup}/${childId}`,
            );
        }

        if (type === MeasurementEditorActionType.KINDERGARTEN) {
            const currentSelectedKindergarten = resultCreator.selectedAssessment?.kindergartens.find(
                (k) => k.kindergarten?._id === value,
            )?.kindergarten;
            const firstChildren = currentSelectedKindergarten?.children![0];

            if (firstChildren) {
                pushHistory(
                    `${measurement}/${resultCreator.selectedAssessment._id}/${value as string}/all/${
                        firstChildren._id
                    }`,
                );
            }
        }

        if (type === MeasurementEditorActionType.GROUP) {
            pushHistory(`${measurement}/${assessmentId}/${kindergartenId}/${value as string}/${childId}`);
        }

        if (type === MeasurementEditorActionType.BACK_TO_TABLE) {
            resultCreator.add();

            redirectToResultTable();
        }

        if (type === MeasurementEditorActionType.SAVE_AND_NEXT) {
            const results = convertValuesToNumber(value as AssessmentValues);

            createOrUpdateResult(
                { childId, assessmentId, kindergartenId, ...mapValuesToResult(results as AssessmentValues) },
                resultCreator,
            );

            onSaveSnackbar(resultCreator);

            resultCreator.add();

            redirectToNextChild();
        }

        if (type === MeasurementEditorActionType.SAVE_AND_BACK_TO_TABLE) {
            const results = convertValuesToNumber(value as AssessmentValues);

            createOrUpdateResult(
                { childId, assessmentId, kindergartenId, ...mapValuesToResult(results as AssessmentValues) },
                resultCreator,
            );

            onSaveSnackbar(resultCreator);

            resultCreator.add();

            redirectToResultTable();
        }
    }

    function onSaveSnackbar(results: ResultCreatorReturnProps) {
        const { edited, selectedChild } = results;

        // eslint-disable-next-line no-void
        void openSnackbar({
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
            // eslint-disable-next-line no-void
            void updateAssessmentResult({ _id: childResult._id, ...update });
        } else {
            // eslint-disable-next-line no-void
            void createAssessmentResult(update);
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
                `${measurement}/${resultCreator.selectedAssessment._id}/${resultCreator.selectedKindergarten._id}/${
                    resultCreator.selectedGroup || ''
                }/${foundNextChild._id}`,
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
