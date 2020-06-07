import React from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles/withStyles';
import { categories } from './BlogCategories';
import { ArticleCategories } from './types';
import { blogCategoryColors } from '../../colors';

type ArticleBadgeProps = {
    articleCategory: ArticleCategories;
};

export const ArticleBadge = ({ articleCategory }: ArticleBadgeProps) => {
    const { color, name } = categories[articleCategory];

    return <StyledBadge color={ color }>{ name }</StyledBadge>;
};

type BadgeProps = {
    color: string;
    children: string;
    classes: Partial<ClassNameMap<keyof typeof styles>>;
};

const Badge = ({ children, classes }: BadgeProps) => {
    return <div className={ classes.root }>{ children }</div>;
};

type Styles = {
    color: string;
    [key: string]: string;
};

type ColorsMap = {
    [key: string]: string;
};

interface BadgeStyles extends WithStyles<typeof styles> {
    color: string;
    children: string;
}

const styledBy = (property: string, colorsMap: ColorsMap) => (props: Styles) => colorsMap[props[property]];

const styles = createStyles({
    root: {
        zIndex: 1,
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
        backgroundColor: styledBy('color', {
            orange: blogCategoryColors.orange,
            yellow: blogCategoryColors.yellow,
            purple: blogCategoryColors.purple,
            lightOrange: blogCategoryColors.lightOrange,
            blue: blogCategoryColors.blue,
        }),
    },
});

const StyledBadge = withStyles(styles)((props: BadgeStyles) => <Badge {...props} />);
