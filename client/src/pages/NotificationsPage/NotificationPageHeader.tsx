import React from 'react'
import { Typography, makeStyles, createStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '../../theme/ThemeProvider';

export const NotificationPageHeader = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <ThemeProvider>
            <Typography variant="h4" gutterBottom className={classes.heading}>
                {t('notifications-page.header')}
            </Typography>
            <Typography variant="h6" gutterBottom>
                {t('notifications-page.description')}
            </Typography>
        </ThemeProvider >
    )
}

const useStyles = makeStyles(() =>
    createStyles({
        heading: {
            fontWeight: 'bold',
            fontSize: '34px',
            width: '60%',
            zIndex: 1,
            position: 'relative',
        },
    }))