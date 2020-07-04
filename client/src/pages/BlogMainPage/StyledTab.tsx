import React from 'react';
import { Tab, createStyles, makeStyles } from '@material-ui/core';
import { white, blogCategoryColors } from '../../colors';

type StyledTabProps = {
    color: string;
    label: string;
};

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            minHeight: '0',
            height: '35px',
            backgroundColor: ({ color }: { color: string }) => blogCategoryColors[color],
            borderRadius: '4px',
            opacity: '1',
            whiteSpace: 'nowrap',
            color: white,
            textTransform: 'none',
            flexShrink: 2,
            fontWeight: 600,
        },
        wrapper: {
            margin: '0 10px',
        },
        selected: {
            height: '45px',
        },
    }),
);

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
