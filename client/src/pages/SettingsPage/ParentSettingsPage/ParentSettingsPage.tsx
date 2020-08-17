import React, { useContext } from 'react';
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { mainColor } from '../../../colors';
import { ParentSettingsExpansionPanel } from './ParentSettingsExpansionPanel';
import { UserContext } from '../../AppWrapper/AppWrapper';

export const ParentSettingsPage = () => {
    const user = useContext(UserContext);
    const classes = useStyles();
    const { t } = useTranslation();

    if (!user) return null;

    return (
        <Grid className={classes.container}>
            <Grid item xs={12}>
                <Typography className={classes.header}>{t('settings-page.parent.header')}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography className={classes.description}>{t('settings-page.parent.description')}</Typography>
            </Grid>
            <ParentSettingsExpansionPanel user={user} />
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: '0 0 54px 0',
            fontFamily: 'Montserrat, sans-serif',

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
        link: {
            color: mainColor,
            fontWeight: 'bold',

            [theme.breakpoints.down('sm')]: {
                textTransform: 'uppercase',
                lineHeight: '18px',
            },
        },
    }),
);
