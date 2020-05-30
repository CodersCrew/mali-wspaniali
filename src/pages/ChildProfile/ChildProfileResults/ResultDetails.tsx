import React from 'react';
import moment from 'moment';
import { Button, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import { Result } from '../../../firebase/types';
import { gray } from '../../../colors';

export const ResultDetails = ({ result }: { result: Result }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.wrapper}>
            <Card className={classes.card}>
                <div className={classes.cardTop}>
                    <Typography variant="subtitle1" className={classes.secondaryText}>
                        {t('child-profile.info-about-test')}
                    </Typography>
                    <Typography variant="h3" className={classes.period}>
                        {result.testPeriod === 'begin'
                            ? t('child-profile.initial-test')
                            : t('child-profile.final-test')}
                    </Typography>
                    <Typography variant="subtitle1" className={classes.secondaryText}>
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
                    <div>TODO: CHART</div>
                    <Button variant={'contained'} color="secondary">
                        {t('child-profile.advice')}
                    </Button>
                </div>
            </Card>
            <div>RIGHT</div>
        </div>
    );
};

const useStyles = makeStyles({
    wrapper: {
        width: '100%',
        display: 'flex',
        padding: '10px 0',
    },
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
    secondaryText: {
        color: 'rgba(0, 0, 0, 0.54)',
    },
});
