import React from 'react';
import { Grid, LinearProgress, makeStyles, createStyles, Typography, Theme, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Assessment } from '../../graphql/types';
import { StatusChip } from '../../components/StatusChip';

interface Props {
    assessment: Assessment;
}

export function AssessmentSubheader({ assessment }: Props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const currentMeasurement = getMostRecentMeasurement();

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
                                <Typography variant="h4">{currentMeasurement.label}</Typography>
                            </Grid>
                            <Grid item>
                                <StatusChip value={currentMeasurement.status} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={1}>
                            <Grid item>
                                <Typography variant="body2">
                                    {currentMeasurement.startDate.split('-').join('.')}&nbsp;-&nbsp;
                                    {currentMeasurement.endDate.split('-').join('.')}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    ({moment(currentMeasurement.endDate).fromNow()})
                                </Typography>
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
                        <Box display="flex" alignItems="flex-end">
                            <Box width="85%" mr={2}>
                                <LinearProgress
                                    variant="determinate"
                                    value={40}
                                    classes={{
                                        root: classes.progressBar,
                                        bar: classes.progressBarDark,
                                        colorPrimary: classes.progressBarLight,
                                    }}
                                />
                            </Box>
                            <Box>
                                <Typography variant="h4">40%</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    function getMostRecentMeasurement() {
        if (assessment.firstMeasurementStatus === 'active') {
            return {
                label: t('add-results-page.first-assessment'),
                status: assessment.firstMeasurementStatus,
                startDate: assessment.firstMeasurementStartDate,
                endDate: assessment.firstMeasurementEndDate,
            };
        }

        return {
            label: t('add-results-page.last-assessment'),
            status: assessment.lastMeasurementStatus,
            startDate: assessment.lastMeasurementStartDate,
            endDate: assessment.lastMeasurementEndDate,
        };
    }
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
