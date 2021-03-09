import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import { createStyles, Theme, Typography } from '@material-ui/core';
import { CircleChart } from '../../../../components/CircleChart';
import { getResultColorAndLabel } from './calculateResult';
import { MAX_POINTS_FOR_TEST } from './constants';
import { white } from '../../../../colors';
import { ButtonSecondary } from '../../../../components/Button';

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
    const { color, key } = getResultColorAndLabel(valueInPoints, MAX_POINTS_FOR_TEST);

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
            <div className={classes.testName}>{t(`child-profile.tests-in-block.${translationKey}`)}</div>
            <Typography variant="subtitle2" className={classes.description}>
                {t(`child-profile.tests-informations.conditions.test-${translationKey}-description`)}
            </Typography>
            <Typography variant="subtitle2" className={classes.levelLabel}>
                {t(`child-profile.result-level`)}
            </Typography>
            <Typography variant="subtitle2" className={classes.level}>
                {t(`child-profile.result-levels.${key}`)}
            </Typography>
            <Typography variant="subtitle2">{t('child-profile.received-points')}:</Typography>
            <div className={classes.points}>
                {valueInPoints} {t('child-profile.pts')}
            </div>
            <ButtonSecondary
                // onClick={(event) => {
                //     if (isExpanded) {
                //         event.stopPropagation();
                //     }

                //     onClose();
                // }}
                variant="text"
                className={classes.detailsButton}
                innerText={t('child-profile.details')}
            />
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: '10px 20px',
            marginTop: '30px',
        },
        chartWrapper: {
            width: theme.spacing(13.75),
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
        description: {
            paddingBottom: '7px',
        },
        level: {
            paddingBottom: '7px',
            textTransform: 'uppercase',
            color: ({ color }: { color: string }) => color,
        },
        levelLabel: {
            paddingBottom: '7px',
        },
        detailsButton: {
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
        },
    }),
);
