import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { HomePageChildren } from './HomePageChildren/HomePageChildren';
import { HomePageArticles } from './HomePageArticles/HomePageArticles';
import { mainColor } from '../../colors';
import { Navbar } from '../../components/Navbar/Navbar';

export const ParentHomePage = () => {
    const classes = useStyles();

    const { container, header, description, link } = classes;
    const { t } = useTranslation();

    return (
        <div className={container}>
            <Navbar />
            <h1 className={ header }>{t('home-page-content.greeting') }</h1>
            <p className={description}>
                { t('home-page-content.check-children-activity') } <span className={ link }>{ t('home-page-content.mali-wspaniali') }</span>
            </p>
            <HomePageChildren />
            <HomePageArticles />
        </div>
    );
};

const useStyles = makeStyles({
    container: {
        padding: '0 0 54px 60px',
        fontFamily: 'Montserrat, sans-serif',
    },
    header: {
        fontSize: 36,
        marginBottom: 20,
        textTransform: 'uppercase',
        marginTop: -25,
        lineHeight: '44px',
    },
    description: {
        marginBottom: 40,
        fontSize: 21,
        lineHeight: '26px',
    },
    link: {
        color: mainColor,
        fontWeight: 'bold',
    },
});
