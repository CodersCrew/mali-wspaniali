import React from 'react';
import { makeStyles, Grid, Theme, createStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { HomePageChildren } from './HomePageTopSection/HomePageChildren';
import { HomePageArticles } from './HomePageArticles';
import { mainColor } from '../../colors';

const smHeight = window.screen.height <= 840 && window.screen.width > 1024;
const mdHeight = window.screen.height < 905 && window.screen.width > 1024;

export const ParentHomePage = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Grid className={classes.container}>
            <Grid item xs={12}>
                <h1 className={classes.header}>{t('home-page-content.greeting')}</h1>
            </Grid>
            <Grid item xs={12}>
                <p className={classes.description}>
                    <span>{t('home-page-content.check-children-activity')} </span>
                    <span className={classes.link}>{t('home-page-content.mali-wspaniali')}</span>
                </p>
            </Grid>
            <HomePageChildren />
            <HomePageArticles />
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: mdHeight ? '0 0 20px 0' : '0 0 54px 0',
            fontFamily: 'Montserrat, sans-serif',

            [theme.breakpoints.down('md')]: {
                padding: '0 0 5px 0',
                textAlign: 'center',
            },
        },
        header: {
            fontSize: smHeight ? 30 : mdHeight ? 33 : 36,
            marginBottom: smHeight ? 10 : mdHeight ? 15 : 20,
            marginTop: 0,
            textTransform: 'uppercase',
            lineHeight: '44px',

            [theme.breakpoints.down('sm')]: {
                fontSize: 21,
                lineHeight: '26px',
            },
        },
        description: {
            margin: mdHeight ? '15px 0 30px 0' : '20px 0 40px 0',
            fontSize: smHeight ? 18 : 21,
            lineHeight: smHeight ? '20px' : '26px',
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
