import { createStyles, makeStyles, Theme } from '@material-ui/core';

import { blogCategoryColors } from '../../colors';
import { ArticleCategory } from '../../graphql/types';

import { categories } from './BlogCategories';

type Props = {
    articleCategory: ArticleCategory;
};

export const ArticleBadge = ({ articleCategory }: Props) => {
    const matchedColor = categories[articleCategory] || categories.other;

    const { color, name } = matchedColor;
    const classes = useStyles({ color });

    return <span className={classes.badge}>{name}</span>;
};

const useStyles = makeStyles((theme: Theme) =>
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
            fontSize: theme.typography.subtitle2.fontSize,
            fontFamily: theme.typography.fontFamily,
            backgroundColor: ({ color }: { color: string }) => blogCategoryColors[color],
        },
    }),
);
