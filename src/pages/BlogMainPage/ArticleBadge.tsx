import React from 'react';
import { makeStyles } from '@material-ui/core';
import { categories } from './BlogCategories';
import { articleCategories } from './types';

type ArticleBadgeProps = {
    articleCategory: articleCategories;
}

export const ArticleBadge = ({articleCategory}: ArticleBadgeProps) => {

    const classes = useStyles();
    // eslint-disable-next-line
    // const color = categories[articleCategory].color;

    return (
        <div className={classes.articleBadge}>{categories[articleCategory].name}</div>
    );
};

const useStyles = makeStyles({
    articleBadge: {
        zIndex: 10,
        backgroundColor: 'white',
        position: 'relative',
        bottom: '25%',
        float: 'right',
        marginRight: '16px',
        padding: '5px 10px',
        borderRadius: '4px',
        opacity: '90%',
        color: 'white',
        fontSize: '14px',
        fontFamily: 'Montserrat'
    },
});