import { Grid, LinearProgress, makeStyles, createStyles, Typography, Theme, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Assessment, AssessmentResult } from '../../graphql/types';
import { StatusChip } from '../../components/StatusChip';
import dayjs from '../../localizedMoment';
import { countProgress } from '../InstructorResultCreatorPage/countProgress';
import { useIsDevice } from '../../queries/useBreakpoints';

interface Props {
    max: number;
    assessment: Assessment;
    results: AssessmentResult[];
}

export function AssessmentSubheader({ results, max, assessment }: Props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const currentMeasurement = getMostRecentMeasurement();
    const currentProgress = countProgressFromResults();
    const device = useIsDevice();

    return (
        <div>
            {!device.isSmallMobile ? (
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
                                            ({dayjs(currentMeasurement.endDate).fromNow()})
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
                                <Typography variant="body2">
                                    {t(`add-results-page.${currentMeasurement.measurement}-assessment-progress`)}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Box display="flex" alignItems="flex-end">
                                    <Box width="85%" mr={2}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={Math.floor((currentProgress * 100) / max)}
                                            classes={{
                                                root: classes.progressBar,
                                                bar: classes.progressBarDark,
                                                colorPrimary: classes.progressBarLight,
                                            }}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography variant="h4">
                                            {Math.floor((currentProgress * 100) / max)}%
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Typography variant="caption">{assessment.title}</Typography>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" spacing={1}>
                            <Grid item>
                                <Typography className={classes.responsiveText} variant="h4">
                                    {currentMeasurement.label}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <StatusChip value={currentMeasurement.status} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" spacing={1}>
                            <Grid item>
                                <Typography className={classes.responsiveSubext1} variant="body2">
                                    {currentMeasurement.startDate.split('-').join('.')}&nbsp;-&nbsp;
                                    {currentMeasurement.endDate.split('-').join('.')}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.responsiveSubext1} variant="subtitle2">
                                    ({dayjs(currentMeasurement.endDate).fromNow()})
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.responsiveSubext2} variant="body2">
                            {t(`add-results-page.${currentMeasurement.measurement}-assessment-progress`)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" spacing={1}>
                            <Grid item xs={10}>
                                <Box mt={1}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={Math.floor((currentProgress * 100) / max)}
                                        classes={{
                                            root: classes.progressBar,
                                            bar: classes.progressBarDark,
                                            colorPrimary: classes.progressBarLight,
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography className={classes.responsiveText} variant="h4">
                                    {Math.floor((currentProgress * 100) / max)}%
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </div>
    );

    function getMostRecentMeasurement() {
        if (assessment.firstMeasurementStatus === 'active') {
            return {
                label: t('add-results-page.first-assessment'),
                status: assessment.firstMeasurementStatus,
                startDate: assessment.firstMeasurementStartDate,
                endDate: assessment.firstMeasurementEndDate,
                measurement: 'first',
            };
        }

        return {
            label: t('add-results-page.last-assessment'),
            status: assessment.lastMeasurementStatus,
            startDate: assessment.lastMeasurementStartDate,
            endDate: assessment.lastMeasurementEndDate,
            measurement: 'last',
        };
    }

    function countProgressFromResults() {
        return results.reduce((acc, result) => {
            return acc + countProgress(currentMeasurement.measurement, result);
        }, 0);
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
        responsiveText: {
            fontSize: '5.2vw',
        },
        responsiveSubext1: {
            fontSize: '3.8vw',
        },
        responsiveSubext2: {
            fontSize: '3.5vw',
        },
    }),
);
