import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, createStyles, Grid, IconButton, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { CircleChart } from '../../../../components/CircleChart';
import { getResultColorAndLabel } from './calculateResult';
import { gray } from '../../../../colors';
import { MAX_OVERALL_POINTS } from './constants';
import { ButtonSecondary } from '../../../../components/Button';
import { TestResult } from '../../../../graphql/types';
import { openAgeDescriptionModal } from './modals/AgeDescriptionModal';
import dayjs from '../../../../localizedMoment';
import { openSnackbar } from '../../../../components/Snackbar/openSnackbar';
import { openAdviceModal } from './modals/AdviceModal';

export interface Props {
    result: TestResult;
}

export const TestSummary = ({ result }: Props) => {
    const { t } = useTranslation();

    const { agilityPoints, powerPoints, speedPoints, strengthPoints, childAge, testPeriod } = result.test;

    const sumOfPoints = agilityPoints + powerPoints + speedPoints + strengthPoints;
    const { color, key } = getResultColorAndLabel(sumOfPoints, MAX_OVERALL_POINTS);
    const classes = useStyles({ color });

    return (
        <>
            <Card className={classes.card} elevation={0}>
                <div className={classes.cardTop}>
                    <Typography variant="caption">{t('child-profile.info-about-test')}</Typography>
                    <Typography variant="h4" className={classes.testDescription}>
                        {testPeriod === 'START' ? t('child-profile.initial-test') : t('child-profile.final-test')}
                    </Typography>
                    <Typography variant="subtitle1">
                        {t('child-profile.carries-out-on')} {dayjs(result.date).format('L')}
                    </Typography>
                </div>
                <div className={classes.cardMiddle}>
                    <Grid direction="row" justify="flex-start" alignItems="center" container>
                        <Grid item>
                            <Typography variant="subtitle2">
                                {t('child-profile.age-group')}:{' '}
                                <span className={classes.age}>
                                    {childAge} {t('years', { count: childAge })}
                                </span>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton
                                aria-label="notifications"
                                onClick={() => {
                                    openAgeDescriptionModal({
                                        preventClose: false,
                                        isCancelButtonVisible: true,
                                    }).then((res) => {
                                        if (!res.close)
                                            openSnackbar({
                                                text: t('parent-settings.modal-edit-account.success-message'),
                                            });
                                    });
                                }}
                            >
                                <InfoOutlinedIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.cardBottom}>
                    <Typography variant="subtitle2" className={classes.fitnessLevelLabel}>
                        {testPeriod === 'START'
                            ? t('child-profile.initial-fitness-level')
                            : t('child-profile.final-fitness-level')}
                        :
                    </Typography>
                    <div className={classes.chart}>
                        <CircleChart
                            color={color}
                            value={sumOfPoints}
                            maxValue={MAX_OVERALL_POINTS}
                            label={String(sumOfPoints)}
                            labelSuffix={t('child-profile.pts')}
                            enableInfoIcon
                        />
                    </div>
                    <div className={classes.resultDescription}>{t(`child-profile.result-description.${key}`)}</div>
                    <ButtonSecondary
                        variant="contained"
                        onClick={() => {
                            openAdviceModal({
                                preventClose: false,
                                isCancelButtonVisible: true,
                                resultKey: key,
                            }).then((res) => {
                                if (!res.close)
                                    openSnackbar({
                                        text: t('parent-settings.modal-edit-account.success-message'),
                                    });
                            });
                        }}
                        innerText={t('child-profile.advice')}
                    />
                </div>
            </Card>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            width: '25%',
            display: 'flex',
            padding: '0px 8px 20px 8px',
            flexDirection: 'column',
        },
        cardTop: {
            display: 'flex',
            flexDirection: 'column',
            borderBottom: `1px solid ${gray}`,
            paddingBottom: '15px',
            // fontSize: theme.typography.h2.fontSize,
        },
        cardMiddle: {
            borderBottom: `1px solid ${gray}`,
            fontSize: '15px',
            lineHeight: 2,
        },
        age: {
            fontWeight: 'bold',
        },
        cardBottom: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '15px',
            paddingTop: '15px',
            lineHeight: 2,
        },
        chart: {
            marginTop: '15px',
            marginBottom: '5px',
            width: '80px',
        },
        resultDescription: {
            textAlign: 'center',
            fontFamily: 'Montserrat',
            fontSize: '14px',
            textTransform: 'uppercase',
            marginBottom: '15px',
            fontWeight: 'bold',
            color: ({ color }: { color: string }) => color,
        },
        fitnessLevelLabel: {
            textAlign: 'center',
        },
        testDescription: {
            padding: '8px 0px',
        },
    }),
);
