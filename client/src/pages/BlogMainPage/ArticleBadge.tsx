import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { categories } from './BlogCategories';
import { blogCategoryColors } from '../../colors';
import { ArticleCategory } from '../../graphql/types';

type Props = {
    articleCategory: ArticleCategory;
};

export const ArticleBadge = ({ articleCategory }: Props) => {
    const matchedColor = categories[articleCategory] || categories.other;

    const { color, name } = matchedColor;
    const classes = useStyles({ color });

    return <span className={classes.badge}>{name}</span>;
};

const useStyles = makeStyles(() =>
    createStyles({
        badge: {
            zIndex: 3,
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
