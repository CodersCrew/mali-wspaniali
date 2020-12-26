import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Typography } from '@material-ui/core';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { CircleChart } from '../../../../components/CircleChart';
import { getResultColorAndLabel } from './calculateResult';
import { gray } from '../../../../colors';
import { MAX_OVERALL_POINTS } from './constants';
import { ButtonSecondary } from '../../../../components/Button';
import { TestResult } from '../../../../graphql/types';
import { BasicModal } from '../../../../components/Modal/BasicModal';

export interface Props {
    result: TestResult;
}

export const TestSummary = ({ result }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslation();

    const { agilityPoints, powerPoints, speedPoints, strengthPoints, childAge, testPeriod } = result.test;

    const sumOfPoints = agilityPoints + powerPoints + speedPoints + strengthPoints;
    const { color, key } = getResultColorAndLabel(sumOfPoints, MAX_OVERALL_POINTS);
    const classes = useStyles({ color });

    return (
        <>
            <Card className={classes.card}>
                <div className={classes.cardTop}>
                    <Typography variant="subtitle1">{t('child-profile.info-about-test')}</Typography>
                    <Typography variant="h3">
                        {testPeriod === 'START' ? t('child-profile.initial-test') : t('child-profile.final-test')}
                    </Typography>
                    <Typography variant="subtitle1">
                        {t('child-profile.carries-out-on')} {moment(result.date).format('L')}
                    </Typography>
                </div>
                <div className={classes.cardMiddle}>
                    <Typography variant="body2">
                        {t('child-profile.age-group')}:{' '}
                        <span className={classes.age}>
                            {childAge} {t('years', { count: childAge })}
                        </span>
                    </Typography>
                </div>
                <div className={classes.cardBottom}>
                    <Typography variant="body2">{t('child-profile.fitness-level')}:</Typography>
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
                        onClick={() => setIsModalOpen(prev => !prev)}
                        innerText={t('child-profile.advice')}
                    />
                </div>
            </Card>
            <BasicModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(prev => !prev)}
                onAction={() => setIsModalOpen(prev => !prev)}
                actionName={t('close')}
            >
                {t(`child-profile.result-description.${key}`)}
            </BasicModal>
        </>
    );
};

const useStyles = makeStyles({
    card: {
        width: '25%',
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
        color: ({ color }: { color: string }) => color,
    },
});
