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
import {useIsDevice} from '../../../../queries/useBreakpoints';

interface Props {
    firstResultPoints: number;
    lastResultPoints: number;
    childAge: number;
}

export const ResultComparison = ({ firstResultPoints, lastResultPoints }: Props) => {
    const { t } = useTranslation();
    const { isSmallMobile } = useIsDevice();
    const key = getDifferenceKey(firstResultPoints, lastResultPoints);
    const difference = Math.abs(firstResultPoints - lastResultPoints);
    const differenceColor = getDifferenceColor(key);
    const classes = useStyles({ differenceColor });
    const resultsData = {
        v1: 60,
        v2: 120,
        v3: 150,
        v4: 180,
        v5: 240,
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
                        <Typography variant="caption"  className={classes.cardTopSubtitle}>{t('child-profile.summary-info')}</Typography>
                        <Typography variant="h4" className={classes.cardTopTitle}>{t('child-profile.test-result')}</Typography>
                    </div>
                    <div className={classes.cardBottom}>
                        <Typography className={classes.cardBottomText} variant="body1">
                            {t('child-profile.comparison-label')}
                        </Typography>
                        <Typography variant="subtitle2" className={classes.difference}>{t(`child-profile.difference.${key}`)}</Typography>
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
                    <Grid container direction={isSmallMobile ? 'column-reverse': 'row'} justify="flex-start" 
                        alignItems={isSmallMobile ? 'flex-start': 'center'} spacing={5}>
                        <Grid item xs={12} sm={8} lg={8} className={classes.ruller}>
                            <Results resultsData={resultsData} />
                        </Grid>
                        <Grid item xs={12} sm={4} lg={4} className={classes.info}>
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
            padding: `${theme.spacing(1)}px 0`,
            justifyContent:'center',
            [theme.breakpoints.down('sm')]: {
                flexWrap: 'wrap',
            },

        },
        card: {
            width: '25%',
            display: 'flex',
            padding:  theme.spacing(2),
            flexDirection: 'column',
            boxShadow: 'none',
            [theme.breakpoints.down('lg')]: {
                minWidth: theme.spacing(34),
            }
        },
        cardTop: {
            borderBottom: `1px solid ${gray}`,
            paddingBottom: `${theme.spacing(1)}px`,

        },
        cardTopSubtitle: {
            color: theme.palette.secondary.dark,
        },
        cardTopTitle: {
            fontWeight: 500,
        },
        cardBottom: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop:  theme.spacing(2),
        },
        cardBottomText: {
            textAlign: 'left',
        },
        difference: {
            fontFamily: 'Montserrat',
            fontSize: 14,
            textTransform: 'uppercase',
            marginBottom: theme.spacing(3),
            marginTop: theme.spacing(3),
            fontWeight: 'bold',
            color: ({ differenceColor }: { differenceColor: string }) => differenceColor,
        },
        rightWrapper: {
            width: '100%',
            margin: `0 ${theme.spacing(4)}px`,
        },
        title: {
            paddingTop: theme.spacing(1),
        },
        ruller: {
        },
        info: {
            [theme.breakpoints.down('xs')]: {
                marginTop: theme.spacing(4)
            },
        }
    }),
);
