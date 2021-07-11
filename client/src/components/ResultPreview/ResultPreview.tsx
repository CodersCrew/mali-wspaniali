import { createStyles, Grid, makeStyles, Theme, Typography, Box } from '@material-ui/core';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ResultComparison } from './ResultComparison';
import { TestSummary } from './TestSummary';
import { useResult } from '../../operations/queries/Results/getResult';
import { ResultContext } from './context';
import { TestDetails } from './TestDetails';
import NoResultsImage from '../../assets/testInformation/Results/no-data.svg';

export function ResultPreview(props: { resultId: string }) {
    const { result } = useResult(props.resultId);

    if (!result) return null;

    if (!isFirstMeasurementDone() || !isLastMeasurementDone()) return <EmptyView childId={result.child._id} />;

    return (
        <ResultContext.Provider value={result}>
            {isFirstMeasurementDone() && <SingleTest prefix="first" />}
            {isLastMeasurementDone() && <SingleTest prefix="last" />}
            {isFirstMeasurementDone() && isLastMeasurementDone() && <ResultComparison />}
        </ResultContext.Provider>
    );

    function isFirstMeasurementDone() {
        if (!result) return;

        return result.assessment.firstMeasurementStatus === 'done';
    }

    function isLastMeasurementDone() {
        if (!result) return;

        return result.assessment.lastMeasurementStatus === 'done';
    }
}

function EmptyView({ childId }: { childId: string }) {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="center" mt={2} mb={4}>
                    <Typography variant="h3">{t('child-profile.results-empty-view.title')}</Typography>
                </Box>
            </Grid>
            <Box mx={5.5}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">
                            {t('child-profile.results-empty-view.empty-results-reason')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box mt={2} mx={2} mb={4}>
                            <Typography variant="body1" gutterBottom>
                                {t('child-profile.results-empty-view.reason-1')}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {t('child-profile.results-empty-view.reason-2')}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {t('child-profile.results-empty-view.reason-3')}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                            <Box mb={2}>
                                <Typography variant="subtitle1">
                                    <Trans
                                        i18nKey="child-profile.results-empty-view.read-more"
                                        components={{
                                            span: (
                                                <Link
                                                    className={classes.link}
                                                    to={`/parent/child/${childId}/tests-information`}
                                                />
                                            ),
                                        }}
                                    />
                                </Typography>
                            </Box>
                            <img src={NoResultsImage} width={157} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
}

function SingleTest(props: { prefix: string }) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <TestSummary {...props} />
            <TestDetails {...props} />
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            padding: `${theme.spacing(2)}px 0`,
            [theme.breakpoints.down('sm')]: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '100vw',
            },
        },
        link: {
            color: theme.palette.secondary.main,
            textDecoration: 'none',
        },
    }),
);
