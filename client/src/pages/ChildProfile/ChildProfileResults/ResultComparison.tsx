import React, { useState } from 'react';
import { Card, Typography, Dialog } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';
import { getDifferenceKey, getResultColorAndLabel } from './utils';
import { MAX_OVERALL_POINTS } from './constants';
import { gray } from '../../../colors';
import { useSubscribed } from '../../../hooks/useSubscribed';
import { Advice } from '../../../firebase/types';
import { OnSnapshotCallback } from '../../../firebase/userRepository';
import { getAdviceByResultAndAge } from '../../../queries/adviceQueries';
import { AdviceModal } from './AdviceModal';
import { ButtonSecondary } from '../../../components/Button';

interface Props {
    firstResultPoints: number;
    lastResultPoints: number;
    childAge: number;
}

export const ResultComparison = ({ firstResultPoints, lastResultPoints, childAge }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslation();
    const { color } = getResultColorAndLabel(lastResultPoints, MAX_OVERALL_POINTS);
    const classes = useStyles({ color });
    const key = getDifferenceKey(firstResultPoints, lastResultPoints);

    const advice = useSubscribed<Advice>((callback: OnSnapshotCallback<Advice>) =>
        getAdviceByResultAndAge(key, childAge, callback),
    ) as Advice;

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
                        {advice && advice.content && (
                            <ButtonSecondary
                                variant="contained"
                                onClick={() => setIsModalOpen(true)}
                                innerText={t('child-profile.comparison-button')}
                            />
                        )}
                    </div>
                </Card>
                <div className={classes.rightWrapper}>
                    <Typography variant="body2" className={classes.title}>
                        {t('child-profile.comparison-right-title')}
                    </Typography>
                </div>
            </div>
            {advice && advice.content && (
                <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <AdviceModal content={advice.content} closeModal={() => setIsModalOpen(false)} />
                </Dialog>
            )}
        </>
    );
};

const useStyles = makeStyles({
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
        color: ({ color }: { color: string }) => color,
    },
    rightWrapper: {
        width: '100%',
        margin: '0 30px',
    },
    title: {
        paddingTop: '10px',
    },
});
