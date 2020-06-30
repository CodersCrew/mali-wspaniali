import React from 'react';
import { Typography, makeStyles, createStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export const NotificationPageHeader = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <>
            <Typography variant="h2" gutterBottom className={classes.heading}>
                {t('notifications-page.header')}
            </Typography>
            <Typography variant="h6" gutterBottom>
                {t('notifications-page.description')}
            </Typography>
        </>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        heading: {
            fontWeight: 'bold',
            width: '60%',
            zIndex: 1,
            position: 'relative',
        },
    }),
);
