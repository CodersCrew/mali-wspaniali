import React from 'react';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ParentSettingsExpansionPanel } from './ParentSettingsExpansionPanel';

export const ParentSettingsPage = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.container}>
            <Typography className={classes.header}>{t('settings-page.parent.header')}</Typography>
            <Typography className={classes.description}>{t('settings-page.parent.description')}</Typography>
            <ParentSettingsExpansionPanel />
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: '0 0 54px 0',

            [theme.breakpoints.down('md')]: {
                padding: '0 0 5px 0',
                textAlign: 'center',
            },
        },
        header: {
            fontSize: 36,
            marginBottom: 20,
            marginTop: 0,
            textTransform: 'uppercase',
            lineHeight: '44px',
            fontWeight: 700,

            [theme.breakpoints.down('sm')]: {
                fontSize: 21,
                lineHeight: '26px',
            },
        },
        description: {
            margin: '20px 0 40px 0',
            fontSize: 21,
            lineHeight: '26px',
            fontWeight: 500,

            [theme.breakpoints.down('sm')]: {
                fontSize: 15,
                display: 'flex',
                flexDirection: 'column',
                lineHeight: '18px',
                margin: '15px 0 20px 0',
            },
        },
    }),
);
