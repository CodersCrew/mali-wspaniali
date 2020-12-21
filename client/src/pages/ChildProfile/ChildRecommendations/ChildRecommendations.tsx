import React from 'react';
import { makeStyles, createStyles, Theme, Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { cardBackgroundColor } from '../../../colors';


export function ChildRecommendations() {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Box className={classes.recommendationsContainer}>
            <Typography variant="subtitle2" className={classes.panelTitle}>
                {t('child-profile.recommendations.panel-title')}
            </Typography>
            <Typography variant="h4" className={classes.title}>
                {t('child-profile.recommendations.title')}
            </Typography>
            <Typography variant="body1" className={classes.body}>
                <strong>{t('child-profile.recommendations.text1-1')}</strong>
                {t('child-profile.recommendations.text1-2')}
                <strong>{t('child-profile.recommendations.text1-3')}</strong>
                {t('child-profile.recommendations.text1-4')}
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
                {t('child-profile.recommendations.subtitle1')}
            </Typography>
            <Typography variant="body1" className={classes.body}>
                {t('child-profile.recommendations.text2')}
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
                {t('child-profile.recommendations.subtitle2')}
            </Typography>
            <Typography variant="body1" className={classes.body}>
                {t('child-profile.recommendations.text3')}
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
                {t('child-profile.recommendations.subtitle3')}
            </Typography>
            <Typography variant="body1" className={classes.body}>
                {t('child-profile.recommendations.text4')}
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
                {t('child-profile.recommendations.subtitle4')}
            </Typography>
        </Box>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        recommendationsContainer: {
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.15)',
            borderRadius: '4px',
            background: cardBackgroundColor,
            margin: '24px',
            padding: '16px',

            [theme.breakpoints.down('md')]: {
                margin: '24',
                padding: '16px',
            },

            [theme.breakpoints.down('xs')]: {
                margin: '24px 16px 24px',
                padding: '12px 16px 12px',
            },
        },
        title: {
            marginBottom: '24px',
        },
        panelTitle: {
            marginBottom: '36px',
        },
        body: {
            marginBottom: '16px',
            color: theme.palette.text.secondary,
        },
        subtitle: {
            fontWeight: 600,
            color: theme.palette.text.secondary,
            marginBottom: '16px',
        },
    }),
);