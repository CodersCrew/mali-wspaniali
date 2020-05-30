import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, Typography } from '@material-ui/core';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { CircleChart } from '../../../components/CircleChart';
import { getResultColorAndLabel } from './utils';
import { gray } from '../../../colors';
import { ResultDetailsProps } from './types';

export const ResultDetailsLeft = ({ result, previousResult }: ResultDetailsProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { color, lightColor, translationKey } = getResultColorAndLabel(result.sumOfPoints);

    return (
        <Card className={classes.card}>
            <div className={classes.cardTop}>
                <Typography variant="subtitle1">{t('child-profile.info-about-test')}</Typography>
                <Typography variant="h3" className={classes.period}>
                    {result.testPeriod === 'begin' ? t('child-profile.initial-test') : t('child-profile.final-test')}
                </Typography>
                <Typography variant="subtitle1">
                    {t('child-profile.carries-out-on')} {moment(result.dateOfTest).format('L')}
                </Typography>
            </div>
            <div className={classes.cardMiddle}>
                <Typography variant="body2">
                    {t('child-profile.age-group')}:{' '}
                    <span className={classes.age}>
                        {result.ageOfChild} {t('years', { count: result.ageOfChild })}
                    </span>
                </Typography>
            </div>
            <div className={classes.cardBottom}>
                <Typography variant="body2">{t('child-profile.fitness-level')}:</Typography>
                <div className={classes.chart}>
                    <CircleChart
                        mainColor={color}
                        secondaryColor={lightColor}
                        value={result.sumOfPoints}
                        maxValue={240}
                        label={String(result.sumOfPoints)}
                        labelSuffix="pkt"
                        previousValue={previousResult && previousResult.sumOfPoints}
                    />
                </div>
                <div className={classes.resultDescription} style={{ color }}>
                    {t(`child-profile.result-description.${translationKey}`)}
                </div>
                <Button variant="contained" color="secondary">
                    {t('child-profile.advice')}
                </Button>
            </div>
        </Card>
    );
};

const useStyles = makeStyles({
    card: {
        width: '20%',
        display: 'flex',
        padding: '16px',
        flexDirection: 'column',
    },
    cardTop: {
        display: 'flex',
        flexDirection: 'column',
        borderBottom: `1px solid ${gray}`,
        paddingBottom: '15px',
    },
    cardMiddle: {
        borderBottom: `1px solid ${gray}`,
        fontSize: '15px',
        padding: '15px 0',
        lineHeight: 2,
        paddingRight: '20%',
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
    period: {
        fontSize: '21px',
        fontWeight: 'bold',
        lineHeight: '50px',
    },
    chart: {
        marginTop: '15px',
        marginBottom: '5px',
        width: '80px',
    },
    resultDescription: {
        fontFamily: 'Montserrat',
        fontSize: '14px',
        textTransform: 'uppercase',
        marginBottom: '15px',
        fontWeight: 'bold',
    },
});
