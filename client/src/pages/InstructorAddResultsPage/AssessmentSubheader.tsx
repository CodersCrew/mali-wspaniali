import React from 'react';
import { Grid, LinearProgress, makeStyles, createStyles, Typography, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Assessment } from '../../graphql/types';
import { StatusChip } from '../AdminAssessmentManagementPage/AssessmentHistoryList/StatusChip';

interface Props {
    assessment: Assessment;
}

export function AssessmentSubheader({ assessment }: Props) {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={4}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Typography variant="caption">{assessment.title}</Typography>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={1}>
                            <Grid item>
                                <Typography variant="h4">{t('add-results-page.first-assessment')}</Typography>
                            </Grid>
                            <Grid item>
                                <StatusChip value={assessment.status} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={1}>
                            <Grid item>
                                <Typography variant="body2">
                                    {assessment.startDate.split('-').join('.')}&nbsp;-&nbsp;
                                    {assessment.endDate.split('-').join('.')}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">({moment(assessment.endDate).fromNow()})</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={8}>
                <Grid
                    container
                    direction="column"
                    justify="flex-end"
                    className={classes.progressBarContainer}
                    spacing={1}
                >
                    <Grid item>
                        <Typography variant="body2">{t('add-results-page.first-assessment-progress')}</Typography>
                    </Grid>
                    <Grid item>
                        <LinearProgress
                            variant="determinate"
                            value={40}
                            classes={{
                                root: classes.progressBar,
                                bar: classes.progressBarDark,
                                colorPrimary: classes.progressBarLight,
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progressBarContainer: {
            height: '100%',
        },
        progressBar: {
            height: 6,
        },
        progressBarDark: {
            background: theme.palette.success.dark,
        },
        progressBarLight: {
            background: theme.palette.success.light,
        },
    }),
);
