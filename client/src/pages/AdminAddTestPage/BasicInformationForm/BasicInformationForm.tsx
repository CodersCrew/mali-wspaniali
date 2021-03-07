import { useTranslation } from 'react-i18next';
import { Grid, Typography, List } from '@material-ui/core';

import { AssessmentManagerState } from '../useAssessmentManager';
import { AssessmentInformationItem } from './AssessmentInformationItem';
import { CustomContainer } from '../../../components/CustomContainer';

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
                                label={t('add-test-view.basic-information-form.test-name')}
                                subheader={assessment.title}
                                status={assessment.status}
                                result={67.5}
                                divider
                                onClick={onClick}
                            />
                            <AssessmentInformationItem
                                label={t('add-test-view.basic-information-form.first-measurement')}
                                subheader={`${assessment.firstMeasurementStartDate} - ${assessment.firstMeasurementEndDate}`}
                                status={assessment.firstMeasurementStatus}
                                result={95}
                                divider
                                disabled={isFirstMeasurementDisabled()}
                                onClick={onClick}
                            />{' '}
                            <AssessmentInformationItem
                                label={t('add-test-view.basic-information-form.last-measurement')}
                                subheader={`${assessment.lastMeasurementStartDate} - ${assessment.lastMeasurementEndDate}`}
                                status={assessment.lastMeasurementStatus}
                                result={40}
                                disabled={isLastMeasurementDisabled()}
                                onClick={onClick}
                            />
                        </List>
                    </Grid>
                </Grid>
            }
        />
    );

    function isFirstMeasurementDisabled() {
        return ['planned', 'not-planned'].includes(assessment.firstMeasurementStatus);
    }

    function isLastMeasurementDisabled() {
        return ['planned', 'not-planned'].includes(assessment.lastMeasurementStatus);
    }
}
