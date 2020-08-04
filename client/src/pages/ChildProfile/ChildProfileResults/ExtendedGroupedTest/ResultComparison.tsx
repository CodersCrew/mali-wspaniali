import React, { useState } from 'react';
import { Card, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';
import { getResultColorAndLabel } from './calculateResult';
import { MAX_OVERALL_POINTS } from './constants';
import { gray } from '../../../../colors';
import { ButtonSecondary } from '../../../../components/Button';
import { Modal } from '../../../../components/Modal';

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
                            onClick={() => setIsModalOpen(prev => !prev)}
                            innerText={t('child-profile.comparison-button')}
                        />
                    </div>
                </Card>
                <div className={classes.rightWrapper}>
                    <Typography variant="body2" className={classes.title}>
                        {t('child-profile.comparison-right-title')}
                    </Typography>
                </div>
            </div>
            <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(prev => !prev)}>
                {t(`child-profile.difference.${key}`)}
            </Modal>
        </>
    );
};

function getDifferenceKey(firstValue: number, lastValue: number) {
    if (firstValue > lastValue) return 'regress';
    if (firstValue < lastValue) return 'progress';

    return 'constant';
}

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
