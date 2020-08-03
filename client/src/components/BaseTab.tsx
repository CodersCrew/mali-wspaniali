import React from 'react';
import { Tab, makeStyles, createStyles, Theme, TabProps } from '@material-ui/core/';
import { blogCategoryColors } from '../colors';

type Props = TabProps & {
    color: string;
    isUseStyle: boolean;
};

export const BaseTab = ({ isUseStyle, color, ...props }: Props) => {
    const classes = useStyles({ color });

    let styles;
    if (isUseStyle) {
        styles = { root: classes.root, wrapper: classes.wrapper, selected: classes.selected };
    }

    return <Tab classes={styles} {...props}></Tab>;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: '0',
            height: '35px',
            border: ({ color }: { color: string }) => `solid 1px ${blogCategoryColors[color]}`,
            borderRadius: '4px',
            opacity: '1',
            whiteSpace: 'nowrap',
            color: ({ color }: { color: string }) => blogCategoryColors[color],
            textTransform: 'none',
            flexShrink: 2,
            fontWeight: theme.typography.button.fontWeight,
        },
        wrapper: {
            margin: '0 10px',
        },
        selected: {
            height: '45px',
        },
    }),
);
