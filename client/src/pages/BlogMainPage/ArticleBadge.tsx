import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { categories } from './BlogCategories';
import { ArticleCategories } from './types';
import { blogCategoryColors } from '../../colors';

type Props = {
    articleCategory: ArticleCategories;
};

export const ArticleBadge = ({ articleCategory }: Props) => {
    const { color, name } = categories[articleCategory];
    const classes = useStyles({ color });

    return <span className={classes.badge}>{name}</span>;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        badge: {
            zIndex: 10,
            position: 'relative',
            bottom: '25%',
            float: 'right',
            marginRight: '16px',
            padding: '5px 10px',
            borderRadius: '4px',
            opacity: '90%',
            color: 'white',
            fontSize: '14px',
            fontFamily: 'Montserrat',
            backgroundColor: ({ color }: { color: string }) => blogCategoryColors[color],
        },
    }),
);
