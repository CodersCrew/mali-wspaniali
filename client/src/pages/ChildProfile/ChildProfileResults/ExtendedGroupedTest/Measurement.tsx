import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import { CircleChart } from '../../../../components/CircleChart';
import { getResultColorAndLabel } from './calculateResult';
import { MAX_POINTS_FOR_TEST } from './constants';
import { white } from '../../../../colors';

interface Props {
    valueInUnitOfMeasure: number;
    valueInPoints: number;
    unitOfMeasure: string;
    scaleFrom: number;
    scaleTo: number;
    translationKey: string;
}

export const Measurement = ({
    valueInUnitOfMeasure,
    valueInPoints,
    unitOfMeasure,
    scaleFrom,
    scaleTo,
    translationKey,
}: Props) => {
    const { t } = useTranslation();
    const { color } = getResultColorAndLabel(valueInPoints, MAX_POINTS_FOR_TEST);

    const classes = useStyles({ color });

    return (
        <div className={classes.container}>
            <div className={classes.chartWrapper}>
                <CircleChart
                    color={color}
                    value={valueInPoints}
                    maxValue={MAX_POINTS_FOR_TEST}
                    label={String(valueInUnitOfMeasure)}
                    labelSuffix={unitOfMeasure}
                />
            </div>
            <div className={classes.testName}>{t(`child-profile.tests.${translationKey}`)}</div>
            <Typography variant="body2" className={classes.scale}>
                {t('child-profile.scale')}: {scaleFrom} {unitOfMeasure} - {scaleTo} {unitOfMeasure}
            </Typography>
            <Typography variant="body2">{t('child-profile.received-points')}:</Typography>
            <div className={classes.points}>
                {valueInPoints} {t('child-profile.pts')}
            </div>
        </div>
    );
};

const useStyles = makeStyles({
    container: {
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
        backgroundColor: ({ color }: { color: string }) => color,
    },
    scale: {
        paddingBottom: '7px',
    },
});
