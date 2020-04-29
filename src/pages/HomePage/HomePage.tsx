import React from 'react';
import { HomePageChildren } from './HomePageTopSection/HomePageChildren/HomePageChildren';
import { HomePageArticles } from './HomePageArticles/HomePageArticles';
import { AppWrapper } from '../AppWrapper/AppWrapper';
import { Navbar } from '../../components/Navbar/Navbar';
import { makeStyles, Grid, Theme, createStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { mainColor } from '../../colors';

export const ParentHomePage = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <AppWrapper>
            <Grid className={classes.container}>
                <Navbar />
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
        </AppWrapper>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: '0 0 54px 60px',
            fontFamily: 'Montserrat, sans-serif',

            [theme.breakpoints.down('md')]: {
                padding: '0 0 5px 0',
                textAlign: 'center',
            },
        },
        header: {
            fontSize: 36,
            marginBottom: 20,
            textTransform: 'uppercase',
            marginTop: -25,
            lineHeight: '44px',

            [theme.breakpoints.down('sm')]: {
                marginTop: 25,
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
