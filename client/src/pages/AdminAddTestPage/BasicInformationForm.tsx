import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, makeStyles, Typography } from '@material-ui/core';

import { LabeledContainer } from '../../components/LabeledContainer';
import { AssessmentManagerState } from './useAssessmentManager';
import { StatusChip } from '../AdminTestsPage/TestHistoryList/StatusChip';

interface Props {
    assessment: AssessmentManagerState;
}

export function BasicInformationForm({ assessment }: Props) {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <LabeledContainer title={t('add-test-view.basic-information-form.title')}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2} direction="column">
                        <Grid item>
                            <Typography variant="subtitle2" className={classes.label}>
                                {t('add-test-view.basic-information-form.test-name')}
                            </Typography>
                            {assessment.title}
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2" className={classes.label}>
                                {t('add-test-view.basic-information-form.status')}
                            </Typography>
                            <StatusChip value={!assessment.isOutdated} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2} direction="column">
                        <Grid item>
                            <Typography variant="subtitle2" className={classes.label}>
                                {t('add-test-view.basic-information-form.first-assessment')}
                            </Typography>
                            {assessment.startDate}
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2" className={classes.label}>
                                {t('add-test-view.basic-information-form.last-assessment')}
                            </Typography>
                            {assessment.endDate}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </LabeledContainer>
    );
}

const useStyles = makeStyles({
    label: {
        marginBottom: 12,
    },
});
