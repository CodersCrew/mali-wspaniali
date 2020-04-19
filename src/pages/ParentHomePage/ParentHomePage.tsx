import React from 'react';
import { makeStyles } from '@material-ui/core';
import { ParentHomeInfo } from './ParentHomeInfo';
import { ParentHomeArticles } from './ParentHomeArticles';
import { mainColor } from '../../colors';
import { Navbar } from '../../components/Navbar/Navbar';

export const ParentHomePage = () => {
    const classes = useStyles();
    const { container, header, description, link } = classes;

    return (
        <div className={container}>
            <Navbar />
            <h1 className={header}>Dzień dobry!</h1>
            <p className={description}>
                Sprawdź aktywność swoich dzieci w programie <span className={link}>Mali Wspaniali</span>
            </p>
            <ParentHomeInfo />
            <ParentHomeArticles />
        </div>
    );
};

const useStyles = makeStyles({
    container: {
        padding: '0 0 54px 60px',
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
    },
});
