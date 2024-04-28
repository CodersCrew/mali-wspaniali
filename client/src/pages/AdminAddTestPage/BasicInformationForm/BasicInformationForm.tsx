import { useTranslation } from 'react-i18next';
import { Grid, Typography, List } from '@material-ui/core';

import { MeasurementType } from '@app/pages/TestResultsPage/TestToggleButton';
import { CustomContainer } from '@app/components/CustomContainer';
import { EmptyPage } from '@app/components/EmptyPage';
import dayjs from '@app/localizedMoment';
import { AssessmentManagerState } from '../useAssessmentManager';
import { AssessmentInformationItem } from './AssessmentInformationItem';

interface Props {
    assessment: AssessmentManagerState;
    onClick: (measurementType: MeasurementType) => void;
}

export function BasicInformationForm({ assessment, onClick }: Props) {
    const { t } = useTranslation();

    return (
        <CustomContainer
            header={<Typography variant="h4">{t('add-test-view.basic-information-form.title')}</Typography>}
            container={
                assessment.title ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <List disablePadding>
                                <AssessmentInformationItem
                                    label={t('add-test-view.basic-information-form.first-measurement')}
                                    subheader={`${dayjs(assessment.firstMeasurementStartDate).format('l')} - ${dayjs(
                                        assessment.firstMeasurementEndDate,
                                    ).format('l')}`}
                                    status={assessment.firstMeasurementStatus}
                                    result={getFirstMeasurementCount()}
                                    divider
                                    disabled={isFirstMeasurementDisabled()}
                                    onClick={() => onClick('first')}
                                />

                                <AssessmentInformationItem
                                    label={t('add-test-view.basic-information-form.last-measurement')}
                                    subheader={`${dayjs(assessment.lastMeasurementStartDate).format('l')} - ${dayjs(
                                        assessment.lastMeasurementEndDate,
                                    ).format('l')}`}
                                    status={assessment.lastMeasurementStatus}
                                    result={getLastMeasurementCount()}
                                    disabled={isLastMeasurementDisabled()}
                                    onClick={() => onClick('last')}
                                />
                            </List>
                        </Grid>
                    </Grid>
                ) : (
                    <EmptyPage />
                )
            }
        />
    );

    function getFirstMeasurementCount() {
        return (assessment.firstMeasurementResultCount * 100) / assessment.maxResultCount;
    }

    function getLastMeasurementCount() {
        return (assessment.lastMeasurementResultCount * 100) / assessment.maxResultCount;
    }

    function isFirstMeasurementDisabled() {
        return ['planned', 'not-planned'].includes(assessment.firstMeasurementStatus);
    }

    function isLastMeasurementDisabled() {
        return ['planned', 'not-planned'].includes(assessment.lastMeasurementStatus);
    }
}
