import { Card, Grid, Theme, Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles } from '@material-ui/styles';
import { gray, lightTextColor, resultColors } from '../../colors';
import { ButtonSecondary } from '../Button';
import { openResultsModal } from './modals/ResultsModal';
import { openSnackbar } from '../Snackbar/openSnackbar';
import { Results } from '../../pages/ChildProfile/ChildProfileResults/ExtendedGroupedTest/Results';
import { ChartLegend } from '../../pages/ChildProfile/ChildProfileResults/ExtendedGroupedTest/ChartLegend';
import { useIsDevice } from '../../queries/useBreakpoints';
import { Result } from './Result';
import { ResultContext } from './context';

export const ResultComparison = () => {
    const { t } = useTranslation();
    const { isSmallMobile } = useIsDevice();

    const classes = useStyles();

    const result = React.useContext(ResultContext);

    if (!result) return null;

    const resultWrapper = new Result({ result });
    const { sumOfPointsFirstMeasurement, sumOfPointsLastMeasurement } = resultWrapper.countSumOfPoints();

    const resultsData = {
        unit: 'pkt',
        result: sumOfPointsLastMeasurement,
        resultStart: sumOfPointsFirstMeasurement,
        hasScoreRangeLabels: false,
        sex: resultWrapper.getSex(),
        minScale: resultWrapper.countCategoryPoints('minScale'),
        maxScale: resultWrapper.countCategoryPoints('maxScale'),
        scale39: resultWrapper.countCategoryPoints('weakStageLimit'),
        scale49: resultWrapper.countCategoryPoints('middleStageLimit'),
        scale59: resultWrapper.countCategoryPoints('goodStageLimit'),
    };

    const key = getDifferenceKey(sumOfPointsFirstMeasurement, sumOfPointsLastMeasurement);
    const difference = Math.round(Math.abs(sumOfPointsFirstMeasurement - sumOfPointsLastMeasurement));
    const differenceColor = getDifferenceColor(key);

    return (
        <>
            <div className={classes.wrapper}>
                <Card className={classes.card}>
                    <div className={classes.cardTop}>
                        <Typography variant="caption" className={classes.cardTopSubtitle}>
                            {t('child-profile.summary-info')}
                        </Typography>
                        <Typography variant="h4" className={classes.cardTopTitle}>
                            {t('child-profile.test-result')}
                        </Typography>
                    </div>
                    <div className={classes.cardBottom}>
                        <Typography variant="body1">{t('child-profile.comparison-label')}</Typography>
                        <Box my={3}>
                            <Typography
                                variant="subtitle2"
                                className={classes.difference}
                                style={{ color: differenceColor }}
                            >
                                {t(`child-profile.difference.${key}`)}
                            </Typography>
                        </Box>
                        <ButtonSecondary
                            variant="contained"
                            onClick={onOpenResultsClick}
                            innerText={t('child-profile.comparison-button')}
                        />
                    </div>
                </Card>
                <div className={classes.rightWrapper}>
                    <Box my={1}>
                        <Typography variant="body1">{t('child-profile.comparison-right-title')}</Typography>
                    </Box>
                    <Grid
                        container
                        direction={isSmallMobile ? 'column-reverse' : 'row'}
                        justify="flex-start"
                        alignItems={isSmallMobile ? 'flex-start' : 'center'}
                        spacing={5}
                    >
                        <Grid item xs={12} sm={9}>
                            <Results
                                unit="pkt"
                                resultsData={resultsData}
                                displayHistoricalResults={sumOfPointsFirstMeasurement > 0}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.info}>
                            <ChartLegend resultKey={key} color={differenceColor} difference={difference} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );

    function onOpenResultsClick() {
        openResultsModal({ progressKey: key, result: resultWrapper }).then((res) => {
            if (!res.close)
                openSnackbar({
                    text: t('user-settings.modal-edit-account.success-message'),
                });
        });
    }
};

function getDifferenceKey(firstValue: number, lastValue: number) {
    if (firstValue > lastValue) return 'regress';
    if (firstValue < lastValue) return 'progress';

    return 'constant';
}

function getDifferenceColor(key: string) {
    if (key === 'progress') return resultColors.green;
    if (key === 'constant') return resultColors.yellow;

    return resultColors.red;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            width: '100%',
            display: 'flex',
            padding: `${theme.spacing(1)}px 0`,
            justifyContent: 'center',
            [theme.breakpoints.down('sm')]: {
                flexWrap: 'wrap',
            },
        },
        card: {
            width: '25%',
            display: 'flex',
            padding: theme.spacing(2),
            flexDirection: 'column',
            boxShadow: 'none',
            [theme.breakpoints.down('lg')]: {
                minWidth: theme.spacing(34),
            },
        },
        cardTop: {
            borderBottom: `1px solid ${gray}`,
            paddingBottom: `${theme.spacing(1)}px`,
        },
        cardTopSubtitle: {
            color: lightTextColor,
        },
        cardTopTitle: {
            fontWeight: 500,
        },
        cardBottom: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: theme.spacing(2),
        },
        difference: {
            textTransform: 'uppercase',
        },
        rightWrapper: {
            width: '100%',
            margin: `0 ${theme.spacing(4)}px`,
        },
        info: {
            [theme.breakpoints.down('xs')]: {
                marginTop: theme.spacing(4),
            },
        },
    }),
);
