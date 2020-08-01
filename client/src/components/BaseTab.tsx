import React from 'react';
import { Tab, makeStyles, createStyles, Theme } from '@material-ui/core/';
import { blogCategoryColors } from '../colors';

type Props = {
    color: string;
    isClassName: boolean;
    disableRipple?: boolean;
};

export const BaseTabProps = ({ isClassName, color, ...props }: Props) => {
    const classes = useStyles({ color });

    let styles;
    if (isClassName) {
        styles = { root: classes.root, wrapper: classes.wrapper, selected: classes.selected };
    }

    return <Tab disableRipple classes={styles} {...props}></Tab>;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: '0',
            height: '35px',
            backgroundColor: ({ color }: { color: string }) => blogCategoryColors[color],
            borderRadius: '4px',
            opacity: '1',
            whiteSpace: 'nowrap',
            color: theme.palette.primary.contrastText,
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
