import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import { CircleChart } from '../../../components/CircleChart';
import { getResultColorAndLabel } from './utils';
import { MAX_POINTS_FOR_TEST } from './constants';
import { white } from '../../../colors';

interface Props {
    valueInUnitOfMeasure: number;
    valueInPoints: number;
    unitOfMeasure: string;
    scaleFrom: number;
    scaleTo: number;
    translationKey: string;
    previousPoints?: number;
}

export const SingleTestResult = ({
    valueInUnitOfMeasure,
    valueInPoints,
    unitOfMeasure,
    scaleFrom,
    scaleTo,
    translationKey,
    previousPoints,
}: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { color, lightColor } = getResultColorAndLabel(valueInPoints, MAX_POINTS_FOR_TEST);

    return (
        <div className={classes.wrapper}>
            <div className={classes.chartWrapper}>
                <CircleChart
                    mainColor={color}
                    value={valueInPoints}
                    maxValue={MAX_POINTS_FOR_TEST}
                    label={String(valueInUnitOfMeasure)}
                    labelSuffix={unitOfMeasure}
                    previousValue={previousPoints}
                    secondaryColor={lightColor}
                />
            </div>
            <div className={classes.testName}>{t(`child-profile.tests.${translationKey}`)}</div>
            <Typography variant="body2" className={classes.scale}>
                {t('child-profile.scale')}: {scaleFrom} {unitOfMeasure} - {scaleTo} {unitOfMeasure}
            </Typography>
            <Typography variant="body2">{t('child-profile.received-points')}:</Typography>
            <div className={classes.points} style={{ backgroundColor: color }}>
                {valueInPoints} {t('child-profile.pts')}
            </div>
        </div>
    );
};

const useStyles = makeStyles({
    wrapper: {
        padding: '10px 20px',
        marginTop: '30px',
    },
    chartWrapper: {
        width: '50%',
        position: 'relative',
    },
    testName: {
        fontFamily: 'Montserrat',
        fontSize: '15px',
        textTransform: 'uppercase',
        marginTop: '15px',
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    points: {
        fontFamily: 'Montserrat',
        fontSize: '14px',
        borderRadius: '16px',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: white,
        width: 'fit-content',
        padding: '3px 10px',
        marginTop: '15px',
    },
    scale: {
        paddingBottom: '7px',
    },
});
