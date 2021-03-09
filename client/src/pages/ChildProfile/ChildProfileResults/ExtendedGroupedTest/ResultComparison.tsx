import React from 'react';
import { Card, Grid, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles } from '@material-ui/styles';
import { gray, resultColors } from '../../../../colors';
import { ButtonSecondary } from '../../../../components/Button';
import { openResultsModal } from './modals/ResultsModal';
import { openSnackbar } from '../../../../components/Snackbar/openSnackbar';

import Results from './Results';
import { ChartLegend } from './ChartLegend';

interface Props {
    firstResultPoints: number;
    lastResultPoints: number;
    childAge: number;
}

export const ResultComparison = ({ firstResultPoints, lastResultPoints }: Props) => {
    const { t } = useTranslation();
    // const { color } = getResultColorAndLabel(lastResultPoints, MAX_OVERALL_POINTS);
    const key = getDifferenceKey(firstResultPoints, lastResultPoints);
    const difference = Math.abs(firstResultPoints - lastResultPoints);
    const differenceColor = getDifferenceColor(key);
    const classes = useStyles({ differenceColor });

    return (
        <>
            <div className={classes.wrapper}>
                <Card className={classes.card}>
                    <div className={classes.cardTop}>
                        <Typography variant="subtitle1">{t('child-profile.summary-info')}</Typography>
                        <Typography variant="h3">{t('child-profile.test-result')}</Typography>
                    </div>
                    <div className={classes.cardBottom}>
                        <Typography className={classes.cardBottomText} variant="body2">
                            {t('child-profile.comparison-label')}
                        </Typography>
                        <div className={classes.difference}>{t(`child-profile.difference.${key}`)}</div>
                        <ButtonSecondary
                            variant="contained"
                            onClick={() => {
                                openResultsModal({
                                    preventClose: false,
                                    isCancelButtonVisible: true,
                                    progressKey: key,
                                }).then((res) => {
                                    if (!res.close)
                                        openSnackbar({
                                            text: t('parent-settings.modal-edit-account.success-message'),
                                        });
                                });
                            }}
                            innerText={t('child-profile.comparison-button')}
                        />
                    </div>
                </Card>
                <div className={classes.rightWrapper}>
                    <Typography variant="body1" className={classes.title}>
                        {t('child-profile.comparison-right-title')}
                    </Typography>
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={5}>
                        <Grid item xs={12} lg={8} className={classes.ruller}>
                            <Results
                                v1={60}
                                v2={120}
                                v3={150}
                                v4={180}
                                v5={240}
                                unit="pkt"
                                result={lastResultPoints}
                                resultStart={firstResultPoints}
                                hasScoreRangeLabels={false}
                                sex="male"
                            />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <ChartLegend resultKey={key} color={differenceColor} difference={difference} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
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
            padding: '10px 0',
        },
        card: {
            width: '25%',
            display: 'flex',
            padding: '16px',
            flexDirection: 'column',
            boxShadow: 'none',
        },
        cardTop: {
            borderBottom: `1px solid ${gray}`,
            paddingBottom: '10px',
        },
        cardBottom: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '15px',
        },
        cardBottomText: {
            textAlign: 'center',
        },
        difference: {
            fontFamily: 'Montserrat',
            fontSize: '14px',
            textTransform: 'uppercase',
            marginBottom: '20px',
            marginTop: '20px',
            fontWeight: 'bold',
            color: ({ differenceColor }: { differenceColor: string }) => differenceColor,
        },

        rightWrapper: {
            width: '100%',
            margin: '0 30px',
        },
        title: {
            paddingTop: '10px',
        },
        ruller: {},
    }),
);
