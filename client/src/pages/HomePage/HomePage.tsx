import React, { useContext, useEffect } from 'react';
import { makeStyles, Grid, createStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { HomePageChildren } from './HomePageTopSection/HomePageChildren/HomePageChildren';
import { HomePageArticles } from './HomePageArticles';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { Theme } from '../../theme/types';
import { UserContext } from '../AppWrapper/AppWrapper';
import { LAST_ARTICLES } from '../../graphql/articleRepository';
import { Article } from '../../graphql/types';
import { activePage } from '../../apollo_client';
import { useQuery } from '@apollo/client';

export const ParentHomePage = () => {
    const user = useContext(UserContext);
    const { data } = useQuery<{ lastArticles: Article[] }>(LAST_ARTICLES, { variables: { count: 6 } });
    const { t } = useTranslation();

    useEffect(() => {
        activePage(['menu.home']);
    }, []);

    const classes = useStyles();

    if (!user || !data) return null;

    return (
        <Grid className={classes.container}>
            <Grid item xs={12}>
                <PageTitle text={t('home-page-content.greeting')} />
            </Grid>
            <Grid item xs={12}>
                <p className={classes.description}>
                    <span>{t('home-page-content.check-children-activity')} </span>
                    <span className={classes.link}>{t('home-page-content.mali-wspaniali')}</span>
                </p>
            </Grid>
            <HomePageChildren children={user.children} />
            <HomePageArticles articles={data.lastArticles} />
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
            color: theme.palette.primary.main,
            fontWeight: 'bold',

            [theme.breakpoints.down('sm')]: {
                textTransform: 'uppercase',
                lineHeight: '18px',
            },
        },
    }),
);
