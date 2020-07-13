import React from 'react';
import { Tab, createStyles, makeStyles } from '@material-ui/core';
import { blogCategoryColors } from '../../colors';
import { Theme } from '../../theme/types';

type StyledTabProps = {
    color: string;
    label: string;
};

export const StyledTab = ({ color, ...props }: StyledTabProps) => {
    const classes = useStyles({ color });

    return (
        <Tab
            disableRipple
            classes={{ root: classes.root, wrapper: classes.wrapper, selected: classes.selected }}
            {...props}
        />
    );
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
