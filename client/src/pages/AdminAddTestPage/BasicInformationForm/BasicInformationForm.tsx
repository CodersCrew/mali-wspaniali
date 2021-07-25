import { useTranslation } from 'react-i18next';
import { Grid, Typography, List } from '@material-ui/core';

import { AssessmentManagerState } from '../useAssessmentManager';
import { AssessmentInformationItem } from './AssessmentInformationItem';
import { CustomContainer } from '../../../components/CustomContainer';
import dayjs from '../../../localizedMoment';

interface Props {
    assessment: AssessmentManagerState;
    onClick: () => void;
}

export function BasicInformationForm({ assessment, onClick }: Props) {
    const { t } = useTranslation();

    return (
        <CustomContainer
            header={<Typography variant="h4">{t('add-test-view.basic-information-form.title')}</Typography>}
            container={
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List disablePadding>
                            <AssessmentInformationItem
                                label={t('add-test-view.basic-information-form.first-measurement')}
                                subheader={`${dayjs(assessment.firstMeasurementStartDate).format('LL')} - ${dayjs(
                                    assessment.firstMeasurementEndDate,
                                ).format('LL')}`}
                                status={assessment.firstMeasurementStatus}
                                result={getFirstMeasurementCount()}
                                divider
                                disabled={isFirstMeasurementDisabled()}
                                onClick={onClick}
                            />{' '}
                            <AssessmentInformationItem
                                label={t('add-test-view.basic-information-form.last-measurement')}
                                subheader={`${dayjs(assessment.lastMeasurementStartDate).format('LL')} - ${dayjs(
                                    assessment.lastMeasurementEndDate,
                                ).format('LL')}`}
                                status={assessment.lastMeasurementStatus}
                                result={getLastMeasurementCount()}
                                disabled={isLastMeasurementDisabled()}
                                onClick={onClick}
                            />
                        </List>
                    </Grid>
                </Grid>
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
