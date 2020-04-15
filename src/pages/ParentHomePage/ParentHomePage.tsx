import React from 'react';
import { makeStyles } from '@material-ui/core';
import { ParentHomeInfo } from './ParentHomeInfo';
import { ParentHomeArticles } from './ParentHomeArticles';
import { mainColor } from '../../colors';

export const ParentHomePage = () => {
    const classes = useStyles();
    const { container, header, description, link } = classes;

    return (
        <div className={container}>
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
        padding: '51px 0 54px 60px',
    },
    header: {
        fontSize: 36,
        marginBottom: 20,
        textTransform: 'uppercase',
    },
    description: {
        marginBottom: 40,
        fontSize: 21,
    },
    link: {
        color: mainColor,
    },
});
