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
import { AssessmentParam, Child } from '../../graphql/types';

interface Props {
    firstResultPoints: number;
    lastResultPoints: number;
    params: {
        run?: AssessmentParam;
        pendelumRun?: AssessmentParam;
        throw?: AssessmentParam;
        jump?: AssessmentParam;
    };
    child: Child;
}

export const ResultComparison = ({ firstResultPoints, lastResultPoints, params, child }: Props) => {
    const { t } = useTranslation();
    const { isSmallMobile } = useIsDevice();
    const key = getDifferenceKey(firstResultPoints, lastResultPoints);
    const difference = Math.abs(firstResultPoints - lastResultPoints);
    console.log(firstResultPoints, lastResultPoints, params);
    const differenceColor = getDifferenceColor(key);
    const classes = useStyles({ differenceColor });
    console.log(params);
    const resultsData = {
        v1: countCategoryPoints('minScale'),
        v2: countCategoryPoints('weakStageLimit'),
        v3: countCategoryPoints('middleStageLimit'),
        v4: countCategoryPoints('goodStageLimit'),
        v5: countCategoryPoints('maxScale'),
        unit: 'pkt',
        result: lastResultPoints,
        resultStart: firstResultPoints,
        hasScoreRangeLabels: false,
        sex: 'male',
    };

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
                            <Typography variant="subtitle2" className={classes.difference}>
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
                        <Grid item xs={12} sm={8} lg={8} className={classes.ruller}>
                            <Results resultsData={resultsData} displayHistoricalResults={firstResultPoints > 0} />
                        </Grid>
                        <Grid item xs={12} sm={4} lg={4} className={classes.info}>
                            <ChartLegend resultKey={key} color={differenceColor} difference={difference} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );

    function onOpenResultsClick() {
        openResultsModal({
            preventClose: false,
            isCancelButtonVisible: true,
            progressKey: key,
            child,
        }).then((res) => {
            if (!res.close)
                openSnackbar({
                    text: t('user-settings.modal-edit-account.success-message'),
                });
        });
    }

    function countCategoryPoints(name: keyof AssessmentParam) {
        const categories = Object.entries(params);

        return categories.reduce((acc, [, category]) => {
            const { a, b } = category;

            const value = category[name] || 0;

            if (a && b) {
                return Math.round(acc + a * value + b);
            }

            return acc;
        }, 0);
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
            color: ({ differenceColor }: { differenceColor: string }) => differenceColor,
        },
        rightWrapper: {
            width: '100%',
            margin: `0 ${theme.spacing(4)}px`,
        },
        ruller: {},
        info: {
            [theme.breakpoints.down('xs')]: {
                marginTop: theme.spacing(4),
            },
        },
    }),
);
